import { Doc } from "yjs";

export type IProvider = {
  docName: string;
  doc: Doc;
  onSynced: () => void;
  onOpen: () => void;
  onConnect: () => void;
};
