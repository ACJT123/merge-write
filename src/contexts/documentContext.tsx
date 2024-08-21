import { createContext, ReactNode, useContext, useState } from "react";
import { IDocumentContext } from "../types/contexts/documentContext";
import Collaboration from "@tiptap/extension-collaboration";
import Highlight from "@tiptap/extension-highlight";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { initProvider, getRandomColor } from "../models/tiptap";
import { doc } from "../models/yjs";
import { Spin } from "antd";

//create context
const DocumentContext = createContext<IDocumentContext>({
  editor: null,
});

//export provider function
export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const provider = initProvider({
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
        document: doc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          color: getRandomColor(),
        },
      }),
    ],
  });

  if (isLoading) return <Spin fullscreen tip="Syncing" size="large" />;

  return (
    <DocumentContext.Provider value={{ editor: editor }}>
      {children}
    </DocumentContext.Provider>
  );
};

//export useDocument function
export const useDocument = () => useContext(DocumentContext);
