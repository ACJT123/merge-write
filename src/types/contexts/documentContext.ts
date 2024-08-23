import { Dispatch } from "react";

export type IDocumentContext = {
  editor: any;
  currentBranch?: string;
  setCurrentBranch?: Dispatch<any>;
};
