import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IDocumentContext,
  IGetDocByBranch,
} from "../types/contexts/documentContext";
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
import { getData, postData } from "../lib/http";
import { BASE_URL } from "../models/url";
import { debounce, get } from "lodash";

//create context
const DocumentContext = createContext<IDocumentContext>({
  editor: null,
  currentBranch: Branch.Master,
  branchList: [],
  setBranchList: () => {},
  setCurrentBranch: () => {},
});

//export provider function
export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  let query = useQuery();

  const [isLoading, setIsLoading] = useState(true);
  const [currentBranch, setCurrentBranch] = useState(Branch.Master);
  const [branchList, setBranchList] = useState<string[]>([]);

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
    console.log("onUpdate called");
    const data = {
      branchName: currentBranch,
      docName: docName,
      content: editor.getJSON(),
    };

    const doc = await postData(BASE_URL + "document/update", data);

    console.log("doc", doc);

    editor?.commands.setContent(doc?.body[0].content);

    // const getDoc = async () => {
    //   editor?.commands.clearContent(true);
    //   const doc: IGetDocByBranch = await getData(
    //     BASE_URL + `document/${docName}/${currentBranch}`
    //   );

    //   if (doc) {
    //     // editor?.destroy();
    //     editor?.commands.setContent(doc.body[0].content);
    //   }
    // };

    // getDoc();
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
    content: "",
  });

  useEffect(() => {
    const getBranchList = async () => {
      const list = await getData(BASE_URL + `branch/${docName}/list`);

      if (list) {
        setBranchList(list);
      }
    };

    getBranchList();

    onUpdate({ editor });
    // d'ont include editor and onUpdate in the dependency array because it will cause multiple requests
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBranch]);

  console.log("branchList", branchList);

  if (isLoading) return <Spin fullscreen tip="Syncing" size="large" />;

  return (
    <DocumentContext.Provider
      value={{
        editor: editor,
        currentBranch: currentBranch,
        branchList: branchList,
        setCurrentBranch: setCurrentBranch,
        setBranchList: setBranchList,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

//export useDocument function
export const useDocument = () => useContext(DocumentContext);
