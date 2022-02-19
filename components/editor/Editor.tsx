import { useEffect, useRef } from "react";
import EditorJS, { EditorConfig } from "@editorJS/editorJS";
import tools from "./tools";
import { EditorProps } from "./types";

const EDITOR_HOLDER_ID = "__editor-js";

const Editor: React.FC<EditorProps> = ({
  data,
  logLevel,
  autofocus,
  onChange,
}) => {
  const $editorJS = useRef<EditorJS>(null);

  useEffect(() => {
    // mount
    if (!$editorJS.current) {
      initEditorJS();
    }

    // destroy
    return () => {
      $editorJS.current?.destroy();
      $editorJS.current = null;
    };
  }, []);

  function initEditorJS() {
    const editorJS = new EditorJS({
      data,
      holder: EDITOR_HOLDER_ID,
      logLevel: (logLevel || "ERROR") as EditorConfig["logLevel"],
      autofocus: autofocus || true,
      tools,
      onReady() {
        $editorJS.current = editorJS;
      },
      onChange: async () => onChange(await editorJS.saver.save()),
    });
  }

  return <div id={EDITOR_HOLDER_ID}></div>;
};

export default Editor;
