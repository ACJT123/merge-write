import { Link } from "react-router-dom";
import { IDocumentCard } from "../types/components/document-card";
import { PlusOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
export default function DocumentCard({
  blank,
  name,
  thumbnailUrl,
  deleteDoc,
}: IDocumentCard) {
  const href = blank ? "/document-name" : `/editor?docName=${name}`;

  const handleChange = (value: any) => {
    const { key } = value;

    switch (key) {
      case "1":
        if (deleteDoc && name) {
          deleteDoc(name);
        }
        break;

      default:
        break;
    }
  };

  const menu = [
    {
      label: "Delete",
      key: "1",
    },
  ];

  return (
    <>
      <div className="w-[150px] h-[200px]">
        <Link to={href}>
          <div className="bg-white rounded-lg border shadow-sm border-gray-200 w-[150px] h-[200px] hover:brightness-75 transition-all">
            {blank ? (
              <div className="w-full h-full flex justify-center items-center">
                <PlusOutlined />
              </div>
            ) : (
              <img
                src={thumbnailUrl}
                alt={name}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            )}
          </div>
        </Link>

        <div className="flex justify-between items-center mt-2">
          <div className="truncate max-w-[120px]">
            {blank ? "Blank Document" : name}
          </div>

          {!blank && (
            <Dropdown
              trigger={["click"]}
              menu={{
                items: menu,
                onClick: handleChange,
              }}
            >
              <div className="rotate-90 cursor-pointer hover:bg-gray-200 rounded-full p-1">
                <img
                  width="20"
                  height="15"
                  src="https://img.icons8.com/material-outlined/24/more.png"
                  alt="more"
                />
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </>
  );
}
