import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "../components/menubar";
import "../styles/pages/editor.scss";
import Collaborators from "../components/collaborators";

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
      <div className="flex justify-center items-center gap-4">
        <Menubar editor={editor} />
        <Collaborators list={[1, 2, 3]} />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
