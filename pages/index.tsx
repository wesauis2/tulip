import { NextPage } from "next";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import { useRef, useState } from "react";
import { EditorData } from "../components/editor/types";
import info from "../package.json";
import Layout from "../components/Layout";
import { FileSystemFileHandle } from "../interfaces";

const Editor = dynamic(
  () => import("../components/editor/Editor").then((i) => i.default),
  { ssr: false }
);

// TODO: https://web.dev/file-system-access/ save to indexeddb
// TODO: maybe? https://web.dev/browser-fs-access/
const HomePage: NextPage = () => {
  const data = useRef<EditorData>(null);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>(null);

  async function openFile() {
    const [fileHandle] = await window.showOpenFilePicker({
      id: "open",
      types: [
        {
          description: "Tulip File",
          accept: {
            "tulip/json": [".tulip"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });

    const file = await fileHandle.getFile();
    const contents = await file.text();

    if (contents.length) {
      data.current = JSON.parse(contents) as EditorData;
    } else {
      data.current = { time: Date.now(), blocks: [] };
    }

    setFileHandle(fileHandle);
  }

  async function saveFile() {
    const writer = await fileHandle.createWritable();

    const contents = JSON.stringify(data.current);
    await writer.write(contents);

    await writer.close();
  }

  if (fileHandle == null) {
    return (
      <Layout>
        <div className={styles.home}>
          <section className={styles.info}>
            <div className={styles.logo}>🌷</div>
            <h2>Tulip</h2>
            <p>{info.version}</p>
          </section>
          <section className={styles.picker}>
            <button onClick={openFile}>Open</button>
          </section>
        </div>
      </Layout>
    );
  }
  console.log(fileHandle);
  const fileName = fileHandle.name.substring(
    0,
    fileHandle.name.lastIndexOf(".")
  );
  return (
    <Layout title={fileName}>
      <Editor
        data={data.current}
        onChange={(contents) => {
          data.current = contents;
          saveFile();
        }}
      />
    </Layout>
  );
};

export default HomePage;
