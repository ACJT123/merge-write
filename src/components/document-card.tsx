import { Link } from "react-router-dom";
import { IDocumentCard } from "../types/components/document-card";
import { PlusOutlined } from "@ant-design/icons";

export default function DocumentCard({
  blank,
  name,
  thumbnailUrl,
}: IDocumentCard) {
  const href = blank ? "/document-name" : `/editor?docName=${name}`;

  return (
    <Link
      className="w-[150px] h-[200px] hover:brightness-75 transition-all"
      to={href}
    >
      <div className="bg-white rounded-lg shadow-md border border-gray-200 w-[150px] h-[200px]">
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

      <div className="mt-2 truncate">{blank ? "Blank Document" : name}</div>
    </Link>
  );
}
