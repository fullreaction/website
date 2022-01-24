import { Component, h, Host, JSX, Prop } from '@stencil/core';
import { FileEntry } from '../../../../../../models/upload.models';
import { RecursiveSkeleton } from '../../../../../../services/file-system-services';

// user needs to inherit Node
// Factory function woop woop

@Component({
  tag: 'comp-tree',
  styleUrl: 'comp-tree.css',
})
export class TreeComponent {
  @Prop() tree: RecursiveSkeleton;
  @Prop() folderDetailFactory: (child: RecursiveSkeleton) => JSX.Element;
  @Prop() fileDetailFactory: (child: FileEntry) => JSX.Element;

  render = () => (
    <Host>
      <comp-tree-node
        class="Tree-NodeWrapper"
        subTree={this.tree}
        isOpen={true}
        folderDetailFactory={this.folderDetailFactory}
        fileDetailFactory={this.fileDetailFactory}
      ></comp-tree-node>
    </Host>
  );
}
