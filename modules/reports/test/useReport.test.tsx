import { useReport } from "../useReport";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Wrapper } from "Wrapper";
import { TablePropsProvider } from "provider/TablePropsProvider";
import { FC, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const HigherWrapper: FC<WrapperProps> = ({ children }) => (
  <TablePropsProvider>
    <Wrapper>{children}</Wrapper>
  </TablePropsProvider>
);

describe("useReport(:reportName)", () => {
  it("should return data", async () => {
    const { result } = renderHook(() => useReport("test"), {
      wrapper: HigherWrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toEqual(false));

    expect(result.current.data).toBeDefined();
  });

  it("should invalidate data", async () => {
    const { result } = renderHook(() => useReport("test"), {
      wrapper: HigherWrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toEqual(false));

    expect(result.current.data).toBeDefined();

    act(() => {
      result.current.refetch()
    })

    console.log(result.current)
    // await waitFor(() => expect(result.current.isFetching).toEqual(true));
    // await waitFor(() => expect(result.current.isFetching).toEqual(false));

    // expect(result.current.data).toBeDefined();
  });
});
