import { Modal } from "antd";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEBOUNCE_TIME_MS = 100;

export default function DocumentName() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const onCancel = () => {
    navigate("/", { replace: true });
  };

  const onChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      }, DEBOUNCE_TIME_MS),
    []
  );

  const onOk = () => {
    navigate(`/editor?docName=${name.trim()}`, { replace: true });
  };

  useEffect(() => {
    return () => {
      onChange.cancel(); // purpose: cleanup the debounce function bcz the debounce function is a closure that captures the onChange function. If we don't cancel the debounce function, the onChange function will be called after the component is unmounted, which will cause a memory leak.
    };
  }, [onChange]);

  return (
    <Modal
      open
      title="Give a name for your document"
      onCancel={onCancel}
      onOk={onOk}
      onClose={onCancel}
      maskClosable={false}
      cancelText="Back"
    >
      <input
        onChange={onChange}
        placeholder="Document Name"
        type="text"
        className="w-full mt-2 p-2 pl-0 border-2 border-x-0 border-t-0 border-b-gray-200 focus:outline-none focus:border-b-gray-500"
      />
    </Modal>
  );
}
