import { Item } from "@api";
import { useAddReportItem, useRefreshReport, useRemoveReportItem, useReport } from "@modules";
import { ChangeEvent, FC, ReactNode, useCallback, useState } from "react";
import { useTableProps } from "../hooks/useTableProps";
import debounce from "lodash/debounce";

const generateRandomId = () => Date.now().toString();

const AddItemForm = () => {
  const [value, setValue] = useState("");
  const { tableProps, reportId } = useTableProps();
  const { trigger, isMutating } = useAddReportItem({
    keys: { ...tableProps, reportId },
  });

  const handleAddItem = () => {
    trigger(
      { name: value, id: generateRandomId(), reportId },
      {
        revalidate: true,
        // populateCache: (currItem, currData: Item[] = [] as Item[]) => {
        //   return [...currData, currItem];
        // },
      }
    );
    setValue("");
  };

  return (
    <div style={{ display: "flex", marginBottom: "40px", marginTop: "100px" }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        style={{ marginLeft: "20px" }}
        onClick={handleAddItem}
        disabled={isMutating}
      >
        add +
      </button>
    </div>
  );
};

const RemoveItemForm = ({ item }: { item: Item }) => {
  const { tableProps, reportId } = useTableProps();

  const { trigger, isMutating } = useRemoveReportItem({
    keys: { ...tableProps, reportId },
  });

  const handleRemoveItem = () => {
    trigger(
      { ...item, reportId },
      {
        revalidate: true,
        // populateCache: (currItem, currData: Item[] = [] as Item[]) => {
        //   return currData.filter((item) => item.id !== currItem?.id);
        // },
      }
    );
  };

  return (
    <button
      style={{ marginLeft: "20px" }}
      onClick={handleRemoveItem}
      disabled={isMutating}
    >
      remove
    </button>
  );
};

const SomeFilters = () => {
  const { updatePage, tableProps, updateSearch, reportId } = useTableProps();
  const refreshReport = useRefreshReport({keys: {...tableProps, reportId}})
  const [search, setSearch] = useState(tableProps.search);

  const debouncedUpdateSearch = useCallback(
    debounce((newSearchTerm: string) => updateSearch(newSearchTerm), 500),
    []
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedUpdateSearch(value);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <input value={search} onChange={handleSearch} />
      <div style={{ display: "flex", marginTop: "20px" }}>
        <button
          style={{ marginRight: "20px" }}
          disabled={tableProps.page === 1}
          onClick={() => {
            updatePage(tableProps.page - 1);
          }}
        >
          prev page
        </button>
        <button
          disabled={tableProps.page >= 3}
          onClick={() => {
            updatePage(tableProps.page + 1);
          }}
        >
          next page
        </button>
      </div>
      <button style={{ marginTop: "10px" }} onClick={refreshReport}>refresh</button>
    </div>
  );
};

const useReportWithTableContext = () => {
  const { tableProps, reportId } = useTableProps();

  return useReport({ keys: { ...tableProps, reportId } });
};

type WithLoaderProps = { children: ReactNode; isLoading: boolean };
const WithLoader: FC<WithLoaderProps> = ({ children, isLoading }) => {
  if (isLoading) {
    return <p>loading</p>;
  }

  return <>{children}</>;
};

export const SomeTable = () => {
  const { data = [], isLoading } = useReportWithTableContext();

  return (
    <div>
      <AddItemForm />
      <WithLoader isLoading={isLoading}>
        {data?.map((item: Item) => (
          <div key={item.id} style={{ display: "flex" }}>
            <p>{item.name}</p>
            <RemoveItemForm item={item} />
          </div>
        ))}
      </WithLoader>
      <SomeFilters />
    </div>
  );
};
