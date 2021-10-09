import { AuthService } from './auth-service';
import { AxiosService, handleFetch, ROOT_URL } from '../utils/httpUtils';
import { Directory, FileEntry } from '../models/upload.models';
import FileSaver from 'file-saver';
import JSZip, { files } from 'jszip';

/*
  * Filetypes mess up if the file isn't in root

*/

export class RecursiveSkeleton {
  dir_name: string;
  dir_id: number;
  showSubfolders = false;
  children: RecursiveSkeleton[] = [];
}

class FileSystemServiceController {
  dirInfo: { currentDir?: number; directories?: Directory[]; files?: FileEntry[] } = {};
  skeleton = new RecursiveSkeleton();
  path: { dir_name: string; dir_id: number }[] = [];

  private fileIcons = new Map<string, string>([
    ['mp4', '../assets/icon/Video-Image.svg'],
    ['mpeg', '../assets/icon/Video-Image.svg'],
    ['mp3', '../assets/icon/Audio-Image.svg'],
    ['wav', '../assets/icon/Audio-Image.svg'],
    ['png', '../assets/icon/Image-Image.svg'],
    ['jpeg', '../assets/icon/Image-Image.svg'],
    ['svg', '../assets/icon/Image-Image.svg'],
    ['doc', '../assets/icon/Doc-Image.svg'],
    ['pdf', '../assets/icon/Doc-Image.svg'],
    ['default', '../assets/icon/Blank-Image.svg'],
  ]);

  async init() {
    await this.getSkeleton(this.skeleton);
    await this.getChildren(null);
  }
  async downloadFile(file: FileEntry) {
    FileSaver.saveAs(
      (await AxiosService.get('filesystem/getfile/' + file.file_id, { responseType: 'blob' })).data,
      file.file_type != null ? file.file_name + '.' + file.file_type : file.file_name,
    );
  }
  getIcon(filetype: string) {
    console.log(filetype);

    return this.fileIcons.get(filetype) || this.fileIcons.get('default');
  }
  async uploadFile(file: File, dir_id: number) {
    const user = await AuthService.getUser();
    const formData = new FormData();

    formData.append('file', file);
    formData.append('dir_id', dir_id.toString());
    formData.append('owner', user.user_id as string);

    await AxiosService.post('filesystem/uploadFile', formData);
  }
  async changeFileName(file_id: number, name: string) {
    console.log(file_id, name);
    await AxiosService.patch('filesystem/changefilename', JSON.stringify({ file_id: file_id, name: name }));
  }
  async deleteFile(file_id: number) {
    await AxiosService.delete('filesystem/deletefile/' + file_id);
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
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_id: dir_id, owner: user.user_id }),
      credentials: 'include',
    };
    await AxiosService.post('filesystem/getdir', JSON.stringify({ dir_id: dir_id, owner: user.user_id }));
    const res: { directories: Directory[]; files: FileEntry[] } = await fetch(
      ROOT_URL + 'filesystem/getdir',
      fetchData,
    ).then(handleFetch);

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
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_name: dir_name, owner: user.user_id, parent_id: parent_id }),
      credentials: 'include',
    };

    await fetch(ROOT_URL + 'filesystem/makedir', fetchData);
  }
  async changeDirName(dir_id: number, name: string) {
    const fetchData: RequestInit = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_id: dir_id, name: name }),
      credentials: 'include',
    };
    await fetch(ROOT_URL + 'filesystem/changedirname', fetchData);
  }

  async removeDirectory(dir_id: number) {
    const fetchData: RequestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_id: dir_id }),
      credentials: 'include',
    };
    const res = await fetch(ROOT_URL + 'filesystem/removedir', fetchData);
  }
  async getChildren(dir_id: number) {
    const user = await AuthService.getUser();

    const res = await AxiosService.post(
      'filesystem/getdir',
      JSON.stringify({ dir_id: dir_id, owner: user.user_id }),
    ).then(AxiosService.handleFetch);

    this.dirInfo.files = res.files;

    this.dirInfo.directories = res.directories;
    this.dirInfo.currentDir = res.parent_id;
    this.path = await this.getPath(dir_id);
  }
  private async getPath(dir_id: number): Promise<{ dir_name: string; dir_id: number }[]> {
    const fetchData: RequestInit = {
      method: 'GET',
      credentials: 'include',
    };

    return await fetch(ROOT_URL + 'filesystem/getpath/' + dir_id, fetchData).then(handleFetch);
  }
  async getSkeleton(skel: RecursiveSkeleton) {
    if (skel == null) skel = this.skeleton;
    const user = await AuthService.getUser();
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_id: skel.dir_id, owner: user.user_id }),
      credentials: 'include',
    };
    const res = await fetch(ROOT_URL + 'filesystem/getskel', fetchData).then(handleFetch);

    skel.dir_name = res.root.dir_name;
    skel.dir_id = res.root.dir_id;
    skel.children = res.children.map(val => {
      return { dir_id: val.dir_id, dir_name: val.dir_name };
    });

    return res;
  }

  async findSkeleton(dir_id: number) {
    if (dir_id == null) return this.skeleton;
    else {
      const path = await this.getPath(dir_id);
      let skel: RecursiveSkeleton = this.skeleton;
      for (const elem of path) {
        skel = skel.children.find(child => (child.dir_id = elem.dir_id));
      }

      return skel;
    }
  }
}
export const FileSystemService = new FileSystemServiceController();
