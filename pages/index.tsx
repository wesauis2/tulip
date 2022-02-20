import { NextPage } from "next";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import { useRef, useState } from "react";
import { EditorData } from "../components/editor/types";
import info from "../package.json";

const Editor = dynamic(
  () => import("../components/editor/Editor").then((i) => i.default),
  { ssr: false }
);

const defaultData = {
  time: Date.now(),
  blocks: [
    {
      type: "paragraph",
      data: {
        text: 'It is a text to the <span class="cdx-tooltip" data-tooltip ="tooltip" >tooltip</span> inline-tool.',
      },
    },
    {
      id: "dRS5M5G7cz",
      type: "paragraph",
      data: {
        text: 'Check out our projects on a <mark class="cdx-marker">github</mark>.',
        alignment: "right",
      },
    },
    {
      id: "QV8mE4t4T0",
      type: "header",
      data: { text: "Why Telegram is the best messenger", level: 2 },
      tunes: { alignment: { alignment: "left" } },
    },
    { id: "lBy8bbEfXU", type: "delimiter", data: {} },
    {
      id: "GfxJw4sCkS",
      type: "alert",
      data: {
        type: "danger",
        message:
          "<strong>Holy smokes!</strong><br>Something seriously <em>bad</em> happened.",
      },
      tunes: { alignment: { alignment: "right" } },
    },
    {
      type: "list",
      data: {
        style: "unordered",
        items: [
          {
            content: "Apples",
            items: [
              {
                content: "Red",
                items: [],
              },
              {
                content: "Green",
                items: [],
              },
            ],
          },
          {
            content: "Bananas",
            items: [
              {
                content: "Yellow",
                items: [],
              },
            ],
          },
        ],
      },
    },
    {
      type: "checklist",
      data: {
        items: [
          {
            text: "This is a block-styled editor",
            checked: true,
          },
          {
            text: "Clean output data",
            checked: false,
          },
          {
            text: "Simple and powerful API",
            checked: true,
          },
        ],
      },
    },
    {
      type: "image",
      data: {
        file: {
          url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
        },
        caption: "Roadster // tesla.com",
        withBorder: false,
        withBackground: false,
        stretched: true,
      },
    },
    {
      type: "link",
      data: {
        link: "https://codex.so",
        meta: {
          title: "CodeX Team",
          site_name: "CodeX",
          description:
            "Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.",
          image: {
            url: "https://codex.so/public/app/img/meta_img.png",
          },
        },
      },
    },
    {
      type: "attachment",
      data: {
        file: {
          url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
          size: 91,
          name: "hero.jpg",
          extension: "jpg",
        },
        title: "Hero",
      },
    },
    {
      type: "table",
      data: {
        withHeadings: true,
        content: [
          ["Kine", "Pigs", "Chicken"],
          ['<span class="inline-code">1 pcs</span>', "3 pcs", "12 pcs"],
          ["100$", "200$", "150$"],
        ],
      },
    },
  ],
  version: "2.23.2",
};

// const HomePage = () => {
//   const [data, setData] = useState<EditorData>(null);

//   onMount(() => {
//     const data = localStorage.getItem("data");
//     setData(data ? JSON.parse(data) : defaultData);
//   });

//   function save(data) {
//     localStorage.setItem("data", JSON.stringify(data));
//   }

//   if (!data) {
//     return <div>loading...</div>;
//   }

//   return (
//     <div>
//       <Editor data={data} onChange={save} />
//     </div>
//   );
// };

// TODO: https://web.dev/file-system-access/ save to indexeddb
// TODO: maybe? https://web.dev/browser-fs-access/
const HomePage: NextPage = () => {
  const data = useRef<EditorData>(null);
  const [fileHandle, setFileHandle] = useState<any>(null);

  async function openFile() {
    const [fileHandle]: [any] = await (window as any).showOpenFilePicker({
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
    );
  }

  return (
    <Editor
      data={data.current}
      onChange={(contents) => {
        data.current = contents;
        saveFile();
      }}
    />
  );
};

export default HomePage;
