import { Doc } from "yjs";

export type IProvider = {
  doc: Doc;
  onSynced: () => void;
  onOpen: () => void;
  onConnect: () => void;
};
