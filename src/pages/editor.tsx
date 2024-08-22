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

  const { editor } = useDocument();

  const users = editor?.storage?.collaborationCursor?.users;

  return (
    <div className="editor">
      <div className="flex justify-between items-center gap-4">
        <div></div>

        <div className="flex gap-4 items-center">
          <Collaborators
            list={users.filter((_: any, index: number) => index !== 0)} // filter out self
          />

          <Branch />
        </div>
      </div>

      <div>
        <Menubar editor={editor} />

        <EditorContent editor={editor} />
      </div>

      {contextHolder}
    </div>
  );
}
