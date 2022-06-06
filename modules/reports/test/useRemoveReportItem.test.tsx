import { renderHook, act, waitFor } from "@testing-library/react";
import { Wrapper } from "Wrapper";
import { TablePropsProvider } from "provider/TablePropsProvider";
import { FC, ReactNode } from "react";
import { useRemoveReportItem } from "../useRemoveReportItem";

interface WrapperProps {
  children: ReactNode;
}

const HigherWrapper: FC<WrapperProps> = ({ children }) => (
  <TablePropsProvider>
    <Wrapper>{children}</Wrapper>
  </TablePropsProvider>
);

describe("useRemoveReportItem(:reportName)", () => {
  it("should add item", async () => {
    const { result } = renderHook(() => useRemoveReportItem("test"), {
      wrapper: HigherWrapper,
    });

    act(() => {
      result.current.removeItem({ name: 'test', id :'3' })
    })

    await waitFor(() => result.current.isLoading === true)
    await waitFor(() => result.current.isLoading === false)
  });
});
