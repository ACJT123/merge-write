export type ICollaborator = {
  clientId: number;
  name: string | null;
  color: string;
};

export type ICollaborators = {
  list: ICollaborator[];
};
