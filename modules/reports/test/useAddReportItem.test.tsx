import { renderHook, act, waitFor } from "@testing-library/react";
import { Wrapper } from "Wrapper";
import { TablePropsProvider } from "provider/TablePropsProvider";
import { FC, ReactNode } from "react";
import { useAddReportItem } from "../useAddReportItem";

interface WrapperProps {
  children: ReactNode;
}

const HigherWrapper: FC<WrapperProps> = ({ children }) => (
  <TablePropsProvider>
    <Wrapper>{children}</Wrapper>
  </TablePropsProvider>
);

describe("useAddReportItem(:reportName)", () => {
  it("should add item", async () => {
    const { result } = renderHook(() => useAddReportItem("test"), {
      wrapper: HigherWrapper,
    });

    act(() => {
      result.current.addItem({ name: 'test', id :'3' })
    })

    await waitFor(() => result.current.isLoading === true)
    await waitFor(() => result.current.isLoading === false)
  });
});
