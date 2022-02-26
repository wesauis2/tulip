export interface FileAccept {
  [mimeType: string]: string[];
}

export interface FileType {
  description: string;
  accept: FileAccept;
}

export interface FilePickerOptions {
  id: string;
  types: FileType[];
  excludeAcceptAllOption: boolean;
  multiple: boolean;
}

export interface FileSystemWritableFileStream {
  locked: boolean;
  abort(): unknown;
  close(): unknown;
  getWriter(): unknown;
  seek(): unknown;
  truncate(): unknown;
  write(content: string): Promise<void>;
}

export interface FileSystemFileHandle {
  name: string;
  getFile(): File;
  createWritable(): Promise<FileSystemWritableFileStream>;
}
