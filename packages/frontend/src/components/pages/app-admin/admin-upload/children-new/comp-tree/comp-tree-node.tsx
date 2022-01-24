import { Component, h, Host, JSX, Prop } from '@stencil/core';
import { FileEntry } from '../../../../../../models/upload.models';
import { FileSystemService, RecursiveSkeleton } from '../../../../../../services/file-system-services';

// user needs to inherit Node

@Component({
  tag: 'comp-tree-node',
  styleUrl: 'comp-tree.css',
})
export class SubTreeComponent {
  @Prop() subTree: RecursiveSkeleton;
  @Prop() isOpen = false;

  @Prop() folderDetailFactory: (child: RecursiveSkeleton) => JSX.Element;
  @Prop() fileDetailFactory: (child: FileEntry) => JSX.Element;

  ArrowWrapperOnClick(e, child: RecursiveSkeleton) {
    e.stopPropagation();

    if (child.directories == null)
      FileSystemService.getSkeleton(child, false).then(() => {
        child.showSubfolders = true;
        this.subTree = { ...this.subTree };
      });
    else {
      child.showSubfolders = !child.showSubfolders;
    }
    this.subTree = { ...this.subTree };
  }
  drawChildren(skel: RecursiveSkeleton): JSX.Element {
    if (skel.files != null) {
      return skel.files.map((child, index) => {
        let count = 0;

        for (let i = 0; i < index; i++) {
          if (skel.files[i].file_name === child.file_name) count++;
        }
        return (
          <div class="Tree-NodeWrapper">
            <button
              class="Tree-Node"
              draggable
              onDragStart={e => {
                e.dataTransfer.setData('text', JSON.stringify({ dragId: child.file_id }));
              }}
            >
              <img class="Tree-NodeIcon" src={FileSystemService.getIcon(child.file_type)}></img>

              <span class="Tree-NodeName">{count === 0 ? child.file_name : child.file_name + ' (' + count + ')'}</span>
              {this.fileDetailFactory(child)}
            </button>
          </div>
        );
      });
    }
  }
  render = () => {
    return this.isOpen && this.subTree.directories != null ? (
      <Host class="Tree-SubTree">
        {this.subTree.directories.map((child, index) => {
          let count = 0;
          for (let i = 0; i < index; i++) {
            if (this.subTree.directories[i].dir_name === child.dir_name) count++;
          }
          return (
            <div
              class="Tree-NodeWrapper"
              onDrop={e => {
                const dragId = JSON.parse(e.dataTransfer.getData('text')).dragId;
                FileSystemService.changeFileParent(dragId, child.dir_id, child.parent_id);
              }}
              onDragOver={e => {
                e.preventDefault();
              }}
              onClick={() => {
                FileSystemService.getChildren(child.dir_id, true);
              }}
            >
              <button class="Tree-Node">
                <div
                  class="Tree-ArrowWrapper"
                  onClick={e => {
                    this.ArrowWrapperOnClick(e, child);
                  }}
                >
                  <div class={{ 'Tree-Arrow': true, 'Tree-ArrowDown': child.showSubfolders }}></div>
                </div>
                <span class="Tree-NodeName">{count === 0 ? child.dir_name : child.dir_name + ' (' + count + ')'}</span>
                {this.folderDetailFactory(child)}
              </button>

              <comp-tree-node
                subTree={child}
                isOpen={child.showSubfolders}
                folderDetailFactory={this.folderDetailFactory}
                fileDetailFactory={this.fileDetailFactory}
              ></comp-tree-node>
            </div>
          );
        })}
        {this.drawChildren(this.subTree)}
      </Host>
    ) : (
      ''
    );
  };
}
