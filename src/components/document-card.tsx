import { IDocumentCard } from "../types/components/document-card";
import { PlusOutlined } from "@ant-design/icons";

export default function DocumentCard({
  blank,
  title,
  thumbnailUrl,
}: IDocumentCard) {
  return (
    <div className="w-[150px] h-[200px]">
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 w-[150px] h-[200px]">
        {blank ? (
          <div className="w-full h-full flex justify-center items-center">
            <PlusOutlined />
          </div>
        ) : (
          <>
            <h1 className="text-xl font-semibold">Document Title</h1>
            <p className="text-gray-500">Document description</p>
          </>
        )}
      </div>

      <div className="mt-2 truncate">{blank && "Blank Document"}</div>
    </div>
  );
}
