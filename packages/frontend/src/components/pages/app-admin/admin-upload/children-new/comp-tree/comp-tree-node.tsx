import { Component, h, Host, Prop } from '@stencil/core';
import { TreeNode } from '../../../../../../utils/treeNode';

// user needs to inherit Node

@Component({
  tag: 'comp-tree-node',
  styleUrl: 'comp-tree.css',
})
export class TreeComponent {
  @Prop() tree: TreeNode;
  render = () => (
    <Host class="Upload-SubCollection">
      <div></div>
    </Host>
  );
}
