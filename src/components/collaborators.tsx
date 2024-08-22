import { useState } from "react";
import {
  ICollaborator,
  ICollaborators,
} from "../types/components/collaborators";
import { Popover } from "antd";

export default function Collaborators({ list }: ICollaborators) {
  const sliced = list.slice(0, 3);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [openPopoverList, setOpenPopoverList] = useState<boolean>(false);

  const handleOpenChange = (newOpen: boolean, index: number) => {
    if (newOpen) {
      setOpenPopoverIndex(index);
    } else {
      setOpenPopoverIndex(null);
    }
  };

  const renderSinglePopover = (collaborator: ICollaborator) => {
    return (
      <div>
        <div>Client ID: {collaborator.clientId}</div>
      </div>
    );
  };

  const renderPopoverList = () => (
    <>
      {list
        .filter((_: any, index: number) => index >= 3)
        .map((collaborator, index) => (
          <div key={index}>
            <div>Client ID: {collaborator.clientId}</div>
          </div>
        ))}
    </>
  );

  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
      {sliced.map((collaborator, index) => (
        <Popover
          content={renderSinglePopover(collaborator)}
          trigger={["click", "hover"]}
          open={openPopoverIndex === index}
          onOpenChange={(newOpen) => handleOpenChange(newOpen, index)}
          key={index}
        >
          <div>
            <img
              className="w-10 h-10 border-2 rounded-full border-gray-200 cursor-pointer hover:brightness-90 transition-all"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt=""
            />
          </div>
        </Popover>
      ))}

      {list.length > 3 && (
        <Popover
          content={renderPopoverList()}
          trigger={["click", "hover"]}
          open={openPopoverList}
        >
          <div
            onClick={() => {
              setOpenPopoverList(!openPopoverList);
            }}
            className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 cursor-pointer"
          >
            {list.length - sliced.length}+
          </div>
        </Popover>
      )}
    </div>
  );
}
