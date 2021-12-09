import { Component, h, Host, JSX, Prop, State } from '@stencil/core';
import { RecursiveSkeleton } from '../../../../../../services/file-system-services';
import { TreeNode } from '../../../../../../utils/treeNode';

// user needs to inherit Node
// Factory function woop woop

@Component({
  tag: 'comp-tree',
  styleUrl: 'comp-tree.css',
})
export class TreeComponent {
  @Prop() tree: RecursiveSkeleton;
  @Prop() detailFactory: (child: RecursiveSkeleton) => JSX.Element;

  render = () => (
    <Host>
      <comp-tree-node subTree={this.tree} isOpen={true} detailFactory={this.detailFactory}></comp-tree-node>
    </Host>
  );
}
