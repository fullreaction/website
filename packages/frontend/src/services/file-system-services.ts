import { AuthService } from './auth-service';
import { AxiosService } from '../utils/httpUtils';
import { Directory, FileEntry } from '../models/upload.models';
import FileSaver from 'file-saver';
import JSZip from 'jszip';

export class RecursiveSkeleton implements Directory {
  dir_name: string;
  dir_id: number;
  parent_id?: number;

  showSubfolders = false;
  directories: RecursiveSkeleton[] = [];
  files: FileEntry[] = [];
}
// Turn all Directory objects into recursiveskeleton
class FileSystemServiceController {
  owner: string | Buffer; // use this instead of calling authservice
  currentDir: RecursiveSkeleton = new RecursiveSkeleton();
  skeleton = new RecursiveSkeleton();
  path: { dir_name: string; dir_id: number }[] = [];

  private fileIcons = new Map<string, string>([
    ['mp4', '../assets/icon/Video-Image.svg'],
    ['mpeg', '../assets/icon/Video-Image.svg'],
    ['mp3', '../assets/icon/Audio-Image.svg'],
    ['wav', '../assets/icon/Audio-Image.svg'],
    ['png', '../assets/icon/Image-Image.svg'],
    ['jpg', '../assets/icon/Image-Image.svg'],
    ['jpeg', '../assets/icon/Image-Image.svg'],
    ['svg', '../assets/icon/Image-Image.svg'],
    ['doc', '../assets/icon/Doc-Image.svg'],
    ['pdf', '../assets/icon/Doc-Image.svg'],
    ['default', '../assets/icon/Blank-Image.svg'],
  ]);
  public draggedFileId: number;

  async init() {
    await this.getSkeleton(this.skeleton, true);
  }

  async updateData(skel: RecursiveSkeleton | number) {
    if (typeof skel == 'number') {
      const res = await FileSystemService.findSkeleton(skel);
      await FileSystemService.getSkeleton(res, false);
    } else {
      await FileSystemService.getSkeleton(skel, false);
    }
  }
  async downloadFile(file: FileEntry) {
    FileSaver.saveAs(
      (await AxiosService.get('filesystem/getfile/' + file.file_id, { responseType: 'blob' })).data,
      file.file_type != null ? file.file_name + '.' + file.file_type : file.file_name,
    );
  }
  async getFile(file: FileEntry) {
    const blobFile: Blob = (await AxiosService.get('filesystem/getfile/' + file.file_id, { responseType: 'blob' }))
      .data;

    return blobFile;
  }
  getIcon(filetype: string) {
    return this.fileIcons.get(filetype) || this.fileIcons.get('default');
  }
  async uploadFile(file: File, dir_id: number) {
    const user = await AuthService.getUser();
    const formData = new FormData();

    formData.append('file', file);
    formData.append('dir_id', dir_id.toString());
    formData.append('owner', user.user_id as string);

    await AxiosService.post('filesystem/uploadFile', formData);
    await this.updateData(dir_id);
  }
  async changeFileName(file_id: number, parent_id: number, name: string) {
    await AxiosService.patch('filesystem/changefilename', JSON.stringify({ file_id: file_id, name: name }));
    await this.updateData(parent_id);
  }
  async deleteFile(file_id: number, parent_id) {
    await AxiosService.delete('filesystem/deletefile/' + file_id);
    await this.updateData(parent_id);
  }

  async downloadDir(dir_id: number, dir_name: string) {
    const root = new JSZip();
    this.zipDir(dir_id, root).then(() => {
      root.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, dir_name);
      });
    });
  }
  async zipDir(dir_id: number, parent) {
    const user = await AuthService.getUser();

    const res: { directories: Directory[]; files: FileEntry[] } = await AxiosService.post(
      'filesystem/getdir',
      JSON.stringify({ dir_id: dir_id, owner: user.user_id }),
    ).then(AxiosService.handleFetch);

    for (const file of res.files) {
      parent.file(
        file.file_type != null ? file.file_name + '.' + file.file_type : file.file_name,
        (await AxiosService.get('filesystem/getfile/' + file.file_id, { responseType: 'blob' })).data,
      );
    }
    if (res.directories.length != 0) {
      for (const folder of res.directories) {
        const child = parent.folder(folder.dir_name);
        await this.zipDir(folder.dir_id, child);
      }
    }
  }

  async makeDir(parent_id: number, dir_name: string) {
    const user = await AuthService.getUser();

    await AxiosService.post(
      'filesystem/makedir',
      JSON.stringify({ dir_name: dir_name, owner: user.user_id, parent_id: parent_id }),
    );
    await this.updateData(parent_id);
  }
  async changeDirName(dir_id: number, parent_id: number, name: string) {
    await AxiosService.patch('filesystem/changedirname', JSON.stringify({ dir_id: dir_id, name: name }));
    await this.updateData(parent_id);
  }

  async removeDirectory(dir_id: number, parent_id: number) {
    await AxiosService.delete('filesystem/removedir', { data: JSON.stringify({ dir_id: dir_id }) });
    await this.updateData(parent_id);
  }
  async getChildren(dir_id: number, moveTo: boolean) {
    let wasError = false;
    const user = await AuthService.getUser();

    const res = await AxiosService.post('filesystem/getdir', JSON.stringify({ dir_id: dir_id, owner: user.user_id }))
      .then(AxiosService.handleFetch)
      .catch(() => {
        this.getChildren(null, true);

        wasError = true;
      });
    if (wasError) return [];
    else if (moveTo) {
      this.currentDir = res.parent; // -
      this.currentDir.directories = res.directories; // -
      this.currentDir.files = res.files;
      this.path = await this.getPath(dir_id);
    }
    if (moveTo) await this.updateData(dir_id);
    return res;
  }
  private async getPath(dir_id: number): Promise<{ dir_name: string; dir_id: number }[]> {
    return await AxiosService.get('filesystem/getpath/' + dir_id).then(AxiosService.handleFetch);
  }
  async getSkeleton(skel: RecursiveSkeleton, moveTo: boolean) {
    if (skel == null) skel = this.skeleton;

    let res;
    if (moveTo || skel.dir_id == this.currentDir.dir_id) res = await this.getChildren(skel.dir_id, true);
    else res = await this.getChildren(skel.dir_id, false);

    skel.dir_name = res.parent.dir_name;
    skel.dir_id = res.parent.dir_id;
    skel.directories = res.directories.map((val, index) => {
      if (skel.directories != null && skel.directories[index] != null)
        return { ...skel.directories[index], dir_id: val.dir_id, dir_name: val.dir_name };
      else return { dir_id: val.dir_id, dir_name: val.dir_name };
    });
    skel.files = res.files;
    this.skeleton = { ...this.skeleton };
    return res;
  }

  async findSkeleton(dir_id: number) {
    if (dir_id == null) return this.skeleton;
    else {
      const path = await this.getPath(dir_id);
      let skel: RecursiveSkeleton = this.skeleton;
      for (const elem of path) {
        skel = skel.directories.find(child => child.dir_id == elem.dir_id);
      }

      return skel;
    }
  }

  async getHeritage(dirOne: number, dirTwo: number) {
    const res = await AxiosService.get(`filesystem/checkheritage/${dirOne}/${dirTwo}`).then(AxiosService.handleFetch);
    console.log(res);
  }
  async changeFileParent(file_id: number, parent_new: number, parent_old: number) {
    const res = await AxiosService.patch(
      'filesystem/changefileparent',
      JSON.stringify({ file_id: file_id, parent_id: parent_new }),
    ).then(AxiosService.handleFetch);

    await this.updateData(parent_new);
    await this.updateData(parent_old); //optimize
  }
}
export const FileSystemService = new FileSystemServiceController();
