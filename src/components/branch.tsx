import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import type { InputRef } from "antd";
import { useDocument } from "../contexts/documentContext";

let index = 0;

export default function Branch() {
  const { currentBranch, setCurrentBranch, branchList, setBranchList } =
    useDocument();
  const [items, setItems] = useState(branchList);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      style={{ width: 300 }}
      className="truncate"
      defaultValue={items[0]}
      placeholder="Choose a branch"
      onChange={(value) => {
        if (setCurrentBranch) {
          setCurrentBranch(value);
        }
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add
            </Button>
          </Space>
        </>
      )}
      options={items?.map((item) => ({ label: item, value: item }))}
    />
  );
}
