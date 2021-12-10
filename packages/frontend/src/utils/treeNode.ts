export class TreeNode {
  id: number;
  name: string;
  children: TreeNode[];
  open = false;

  constructor(params: { id: number; name: string; children: TreeNode[] }) {
    this.id = params.id;
    this.name = params.name;
    this.children = params.children;
  }
}
