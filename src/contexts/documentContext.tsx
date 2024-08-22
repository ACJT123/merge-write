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
import useQuery from "../hooks/useQuery";
import { Branch } from "../models/branch";
import { postData } from "../lib/http";
import { BASE_URL } from "../models/url";

//create context
const DocumentContext = createContext<IDocumentContext>({
  editor: null,
});

//export provider function
export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  let query = useQuery();

  const [isLoading, setIsLoading] = useState(true);

  const docName = query.get("docName") || "blank";

  const provider = initProvider({
    docName,
    doc,
    onSynced() {
      console.log("onSynced called");
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
    onUpdate({ editor }) {
      const initBranch = async () => {
        const data = {
          docName: docName,
          content: editor.getJSON(),
          name: Branch.Master,
        };

        await postData(BASE_URL + "branch/create", data);

        setIsLoading(false);
      };

      initBranch();
    },
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
