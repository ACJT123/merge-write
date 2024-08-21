import { useEffect, useState } from "react";
import DocumentCard from "../components/document-card";
import { IDocumentList } from "../types/pages/documents";
import { getData } from "../lib/http";
import { BASE_URL } from "../models/url";

export default function Documents() {
  const [documentList, setDocumentList] = useState<IDocumentList[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const { list }: { list: IDocumentList[] } = await getData(
        BASE_URL + "document/list"
      );

      setDocumentList(list);
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h1>Documents</h1>

      <div className="grid grid-cols-8 mt-2">
        <DocumentCard blank />

        {documentList.map((item, index) => (
          <DocumentCard
            key={index}
            name={item.name}
            thumbnailUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2022/08/How-to-lazy-load-images-in-React-1.png"
          />
        ))}
      </div>
    </div>
  );
}
