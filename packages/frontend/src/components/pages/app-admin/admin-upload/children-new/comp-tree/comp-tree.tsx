import { Component, h, Host, Prop } from '@stencil/core';
import { RecursiveSkeleton } from '../../../../../../services/file-system-services';
import { TreeNode } from '../../../../../../utils/treeNode';

// user needs to inherit Node

@Component({
  tag: 'comp-tree',
  styleUrl: 'comp-tree.css',
})
export class TreeComponent {
  @Prop() tree: RecursiveSkeleton;

  render = () => (
    <Host>
      <comp-tree-node subTree={this.tree} isOpen={true}>
        <slot></slot>
        <slot slot="Detail" />
      </comp-tree-node>
    </Host>
  );
}
