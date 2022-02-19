import dynamic from "next/dynamic";
import { useRef } from "react";
import { EditorData } from "../components/editor/types";

const Editor = dynamic(
  () => import("../components/editor/Editor").then((i) => i.default),
  { ssr: false }
);

const HomePage = () => {
  const $data = useRef<EditorData>();

  return (
    <div>
      <Editor
        logLevel="VERBOSE"
        data={$data.current}
        onChange={(data) => ($data.current = data)}
      />
    </div>
  );
};

export default HomePage;
