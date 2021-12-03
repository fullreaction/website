import { Component, h, Host, Prop } from '@stencil/core';

// user needs to inherit Node
class Node {
  text: string;
  children: Node[];
  open = false;
}

@Component({
  tag: 'comp-tree',
  styleUrl: 'comp-tree.css',
})
export class TreeComponent {
  @Prop() tree: Node;
  render = () => (
    <Host class="Upload-Side">
      <div></div>
    </Host>
  );
}
