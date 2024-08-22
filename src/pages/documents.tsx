import { useEffect, useState } from "react";
import DocumentCard from "../components/document-card";
import { IDocumentList } from "../types/pages/documents";
import { getData, postData } from "../lib/http";
import { BASE_URL } from "../models/url";
import { message } from "antd";

export default function Documents() {
  const [msg, contextHolder] = message.useMessage();
  const [documentList, setDocumentList] = useState<IDocumentList[]>([]);

  const fetchDocuments = async () => {
    const { list }: { list: IDocumentList[] } = await getData(
      BASE_URL + "document/list"
    );

    setDocumentList(list);
  };

  useEffect(() => {
    window.onpopstate = () => {
      window.location.reload(); // refresh the page when back button is clicked
    };

    fetchDocuments();
  }, []);

  const deleteDoc = async (name: string) => {
    const response: { msg: string; success: boolean } = await postData(
      BASE_URL + `document/delete?docName=${name}`
    );

    if (response.success) {
      fetchDocuments();
      msg.success(response.msg);
    } else {
      msg.error(response.msg);
    }
  };

  return (
    <div>
      <h1>Documents</h1>

      <div className="grid grid-cols-8 mt-2">
        <DocumentCard blank />

        {documentList.map((item, index) => (
          <DocumentCard
            deleteDoc={deleteDoc}
            key={index}
            name={item.name}
            thumbnailUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2022/08/How-to-lazy-load-images-in-React-1.png"
          />
        ))}
      </div>

      {contextHolder}
    </div>
  );
}
