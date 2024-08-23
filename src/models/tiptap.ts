import { TiptapCollabProvider } from "@hocuspocus/provider";
import { IProvider } from "../types/models/tiptap";

export const initProvider = ({
  docName,
  doc,
  onSynced,
  onOpen,
  onConnect,
}: IProvider) => {
  return new TiptapCollabProvider({
    // name: generateUUID(),
    name: docName,
    appId: process.env.REACT_APP_TIP_TAP_APP_ID!,
    token: process.env.REACT_APP_TIP_TAP_TOKEN,
    document: doc,
    onSynced,
    onOpen,
    onConnect,
  });
};

const colors = [
  "#958DF1",
  "#F98181",
  "#FBBC88",
  "#FAF594",
  "#70CFF8",
  "#94FADB",
  "#B9F18D",
  "#C3E2C2",
  "#EAECCC",
  "#AFC8AD",
  "#EEC759",
  "#9BB8CD",
  "#FF90BC",
  "#FFC0D9",
  "#DC8686",
  "#7ED7C1",
  "#F3EEEA",
  "#89B9AD",
  "#D0BFFF",
  "#FFF8C9",
  "#CBFFA9",
  "#9BABB8",
  "#E3F4F4",
];

const _getRandomElement = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)];

export const getRandomColor = () => _getRandomElement(colors);

export const UPDATE_DEBOUNCE_MS = 2000;
