import { FilePickerOptions, FileSystemFileHandle } from ".";

declare global {
  interface Window {
    showOpenFilePicker(
      options: FilePickerOptions
    ): Promise<FileSystemFileHandle[]>;
  }
}
