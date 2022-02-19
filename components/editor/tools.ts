import Paragraph from "@editorjs/paragraph";
import { EditorTools } from "./types";

const tools: EditorTools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      placeholder: "What's in your mind?",
      preserveBlank: true,
    },
  },
};

export default tools;
