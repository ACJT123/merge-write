import { createContext, ReactNode, useContext, useState } from "react";
import { IDocumentContext } from "../types/contexts/documentContext";
import Collaboration from "@tiptap/extension-collaboration";
import Highlight from "@tiptap/extension-highlight";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  initProvider,
  getRandomColor,
  UPDATE_DEBOUNCE_MS,
} from "../models/tiptap";
import { doc } from "../models/yjs";
import { Spin } from "antd";
import useQuery from "../hooks/useQuery";
import { Branch } from "../models/branch";
import { postData } from "../lib/http";
import { BASE_URL } from "../models/url";
import { debounce } from "lodash";

//create context
const DocumentContext = createContext<IDocumentContext>({
  editor: null,
  currentBranch: Branch.Master,
  setCurrentBranch: () => {},
});

//export provider function
export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  let query = useQuery();

  const [isLoading, setIsLoading] = useState(true);
  const [currentBranch, setCurrentBranch] = useState(Branch.Master);

  const docName = query.get("docName") || "blank";

  const provider = initProvider({
    docName,
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

  const onUpdate = debounce(async ({ editor }: any) => {
    const data = {
      branchName: currentBranch,
      docName: docName,
      content: editor.getJSON(),
    };

    await postData(BASE_URL + "document/update", data);
  }, UPDATE_DEBOUNCE_MS);

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
    onUpdate: onUpdate,
  });

  if (isLoading) return <Spin fullscreen tip="Syncing" size="large" />;

  return (
    <DocumentContext.Provider
      value={{
        editor: editor,
        currentBranch: currentBranch,
        setCurrentBranch: setCurrentBranch,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

//export useDocument function
export const useDocument = () => useContext(DocumentContext);
