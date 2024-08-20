import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "../components/menubar";
import "../styles/pages/editor.scss";
import Collaborators from "../components/collaborators";
import Branch from "../components/branch";
import Collaboration from "@tiptap/extension-collaboration";
import { doc } from "../models/yjs";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { getRandomColor, initProvider } from "../models/tiptap";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";

export default function Editor() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);

  let provider = initProvider({
    doc,
    onSynced() {
      console.log("onSynced called");
      setIsLoading(false);
    },
    onOpen() {
      console.log("Document opened.");
    },
    onConnect() {
      console.log("Connected to the server.");
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Collaboration.configure({
        document: doc, // Configure Y.Doc for collaboration
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          color: getRandomColor(),
        },
      }),
    ],
  });

  const users = editor?.storage?.collaborationCursor?.users;

  return (
    <div className="editor">
      <div className="flex justify-center items-center gap-4">
        <Menubar editor={editor} />

        <Collaborators list={[1, 2, 3]} />

        <Branch />
      </div>

      {isLoading ? (
        <Spin fullscreen tip="Syncing" size="large" />
      ) : (
        <EditorContent editor={editor} />
      )}

      {contextHolder}
    </div>
  );
}
