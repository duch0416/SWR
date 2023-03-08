import { useState, ReactNode, createContext, FC } from "react";

interface TableProviderProps {
  children: ReactNode;
  reportId: string;
}

type UpdatePageType = (page: number) => void;
type UpdateSearchType = (search: string) => void;

interface TableProps {
  page: number;
  search: string;
}

interface TablePropsContextType {
  tableProps: TableProps;
  updatePage: UpdatePageType;
  updateSearch: UpdateSearchType;
  reportId: string;
}

const initState: TableProps = {
  page: 1,
  search: "",
};

export const TablePropsContext = createContext({} as TablePropsContextType);

export const TablePropsProvider: FC<TableProviderProps> = ({
  children,
  reportId,
}) => {
  const [tableProps, setTableProps] = useState<TableProps>({
    ...initState,
  });

  const updatePage: UpdatePageType = (page) => {
    setTableProps({
      ...tableProps,
      page,
    });
  };

  const updateSearch: UpdateSearchType = (search: string) => {
    setTableProps({
      ...tableProps,
      search,
    });
  };

  return (
    <TablePropsContext.Provider
      value={{ tableProps, updatePage, updateSearch, reportId }}
    >
      {children}
    </TablePropsContext.Provider>
  );
};
