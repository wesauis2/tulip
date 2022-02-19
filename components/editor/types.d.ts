import { EditorConfig } from "@editorjs/editorjs";

export type EditorData = EditorConfig["data"];

export type EditorTools = EditorConfig["tools"];

export interface EditorProps {
  data: EditorData;
  logLevel?: "VERBOSE" | "INFO" | "WARN" | "ERROR";
  autofocus?: boolean;
  onChange: (data: EditorData) => void;
}
