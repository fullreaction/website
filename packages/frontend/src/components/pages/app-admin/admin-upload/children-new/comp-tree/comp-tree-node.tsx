import { Component, h, Host, Prop } from '@stencil/core';
import { FileSystemService, RecursiveSkeleton } from '../../../../../../services/file-system-services';
import { TreeNode } from '../../../../../../utils/treeNode';

// user needs to inherit Node

@Component({
  tag: 'comp-tree-node',
  styleUrl: 'comp-tree.css',
})
export class SubTreeComponent {
  @Prop() subTree: RecursiveSkeleton;
  @Prop() isOpen = false;

  ArrowWrapperOnClick(e, child) {
    e.stopPropagation();

    if (child.children == null)
      FileSystemService.getSkeleton(child, false).then(() => {
        child.showSubfolders = true;
        this.subTree = { ...this.subTree };
      });
    else {
      child.showSubfolders = !child.showSubfolders;
    }
    this.subTree = { ...this.subTree };
  }

  render = () =>
    this.isOpen && this.subTree.children != null ? (
      <Host class="Tree-SubTree">
        {this.subTree.children.map((child, index) => {
          let count = 0;
          for (let i = 0; i < index; i++) {
            if (this.subTree.children[i].dir_name === child.dir_name) count++;
          }
          return (
            <div class="Tree-NodeWrapper">
              <button class="Tree-Node">
                <div
                  class="Tree-ArrowWrapper"
                  onClick={e => {
                    this.ArrowWrapperOnClick(e, child);
                  }}
                >
                  <div class={{ 'Tree-Arrow': true, 'Tree-ArrowDown': child.showSubfolders }}></div>
                </div>
                <span class="Tree-NodenName">{count === 0 ? child.dir_name : child.dir_name + ' (' + count + ')'}</span>
                <slot></slot>
              </button>

              <comp-tree-node subTree={child} isOpen={child.showSubfolders}>
                <slot name="Detail"></slot>
              </comp-tree-node>
            </div>
          );
        })}
      </Host>
    ) : (
      ''
    );
}
