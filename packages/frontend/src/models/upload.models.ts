export interface Directory {
  dir_name?: string;
  parent_id?: number;
  dir_id?: number;
}

export interface FileEntry {
  file_id: number;
  file_name: string;
  file_type?: string;
  parent_id: number;
}
