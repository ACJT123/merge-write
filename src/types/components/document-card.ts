export type IDocumentCard = {
  blank?: boolean;
  name?: string;
  thumbnailUrl?: string;
  deleteDoc?: (name: string) => void;
};
