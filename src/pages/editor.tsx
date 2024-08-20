import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "../components/menubar";
import "../styles/pages/editor.scss";
import Collaborators from "../components/collaborators";
import Branch from "../components/branch";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { useEffect } from "react";
import { TiptapCollabProvider } from "@hocuspocus/provider";

const doc = new Y.Doc(); // Initialize Y.Doc for shared editing

export default function Editor() {
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
    ],
  });

  useEffect(() => {
    const provider = new TiptapCollabProvider({
      name: "document.name", // todo: random id
      appId: process.env.REACT_APP_TIP_TAP_APP_ID!,
      token: process.env.REACT_APP_TIP_TAP_TOKEN,
      document: doc,

      // The onSynced callback ensures initial content is set only once using editor.setContent(), preventing repetitive content loading on editor syncs.
      onSynced() {
        if (!doc.getMap("config").get("initialContentLoaded") && editor) {
          doc.getMap("config").set("initialContentLoaded", true);

          editor.commands.setContent(`
          <p>This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.</p>
          <p>The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.</p>
          `);
        }
      },

      onOpen() {
        console.log("WebSocket connection opened.");
      },
      onConnect() {
        console.log("Connected to the server.");
      },
    });

  }, [editor]);

  return (
    <div className="editor">
      <div className="flex justify-center items-center gap-4">
        <Menubar editor={editor} />

        <Collaborators list={[1, 2, 3]} />

        <Branch />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
