import { useState, ReactNode, createContext, FC } from "react";

interface TableProviderProps {
  children: ReactNode;
  initFilters?: Filters;
}

type UpdatePageType = (page: number) => void;
type UpdateFilterType = (filterPayload: FilterPayload) => void;
type UpdateSearchType = (search: string) => void;

type FilterValue = string | number;

type Filters = {
  [name: string]: FilterValue;
};

type FilterPayload = {
  name: string;
  value: FilterValue;
};

interface TableProps {
  page: number;
  search: string;
  filters: {
    [name: string]: FilterValue;
  };
}

interface TablePropsContextType {
  tableProps: TableProps;
  updatePage: UpdatePageType;
  updateFilter: UpdateFilterType;
  updateSearch: UpdateSearchType;
}

const initState: Omit<TableProps, "filters"> = {
  page: 1,
  search: "",
};

export const TablePropsContext = createContext({} as TablePropsContextType);

export const TablePropsProvider: FC<TableProviderProps> = ({
  children,
  initFilters = {},
}) => {
  const [tableProps, setTableProps] = useState<TableProps>({
    ...initState,
    filters: initFilters,
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

  const updateFilter: UpdateFilterType = ({ name, value }) => {
    setTableProps({
      ...tableProps,
      filters: {
        ...tableProps.filters,
        [name]: value,
      },
    });
  };

  return (
    <TablePropsContext.Provider
      value={{ tableProps, updatePage, updateFilter, updateSearch }}
    >
      {children}
    </TablePropsContext.Provider>
  );
};
