import { useAddReportItem, useRemoveReportItem, useReport } from "@modules";
import { useState } from "react";
import { AddReportItemPayload } from "../api/reports/types";
import { useTableProps } from "../hooks/useTableProps";

const generateRandomId = () => Date.now().toString();

const AddItemForm = () => {
  const [value, setValue] = useState("");
  const { addItem } = useAddReportItem("some");

  const handleAddItem = () => {
    addItem({ name: value, id: generateRandomId() });
    setValue("");
  };

  return (
    <div style={{ display: "flex", marginBottom: "40px", marginTop: "100px" }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button style={{ marginLeft: "20px" }} onClick={handleAddItem}>
        add +
      </button>
    </div>
  );
};

const RemoveItemForm = ({ item }: { item: AddReportItemPayload }) => {
  const { removeItem } = useRemoveReportItem("some");

  const handleRemoveItem = () => {
    removeItem(item);
  };

  return (
    <button style={{ marginLeft: "20px" }} onClick={handleRemoveItem}>
      remove
    </button>
  );
};

const SomeFilters = () => {
  const { updatePage, tableProps, updateSearch } = useTableProps();

  return (
    <div style={{ marginTop: "40px" }}>
      <input
        value={tableProps.search}
        onChange={(e) => updateSearch(e.target.value)}
      />
      <div style={{ display: "flex", marginTop: '20px' }}>
        <button
          style={{ marginRight: "20px" }}
          onClick={() => {
            updatePage(tableProps.page - 1);
          }}
        >
          prev page
        </button>
        <button
          onClick={() => {
            updatePage(tableProps.page + 1);
          }}
        >
          next page
        </button>
      </div>
    </div>
  );
};

export const SomeTable = () => {
  const { data, isLoading } = useReport("some");

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div>
      <AddItemForm />
      {data?.map((item: any) => (
        <div key={item.id} style={{ display: "flex" }}>
          <p>{item.name}</p>
          <RemoveItemForm item={item} />
        </div>
      ))}
      <SomeFilters />
    </div>
  );
};
