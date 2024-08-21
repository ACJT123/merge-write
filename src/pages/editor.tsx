import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "../components/menubar";
import "../styles/pages/editor.scss";
import Collaborators from "../components/collaborators";
import Branch from "../components/branch";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { useDocument } from "../contexts/documentContext";

export default function Editor() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);

  const { editor } = useDocument();

  const users = editor?.storage?.collaborationCursor?.users;

  return (
    <div className="editor">
      <div className="flex justify-center items-center gap-4">
        <Menubar editor={editor} />

        <Collaborators list={[1, 2, 3]} />

        <Branch />
      </div>

      <EditorContent editor={editor} />

      {contextHolder}
    </div>
  );
}
