import { Dispatch } from "react";

export type IDocumentContext = {
  editor: any;
  currentBranch?: string;
  branchList: string[];
  setBranchList?: Dispatch<any>;
  setCurrentBranch?: Dispatch<any>;
};

export type IGetDocByBranch = {
  docName: string;
  body: {
    branchName: string;
    content: any;
  }[];
};
