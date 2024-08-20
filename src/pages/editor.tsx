import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "../components/menubar";
import "../styles/pages/editor.scss";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
  });

  return (
    <div className="editor">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
