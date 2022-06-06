import { reportKeys, useReport } from "../useReport";
import { act, renderHook, waitFor } from "@testing-library/react";
import { queryClient, Wrapper } from "Wrapper";
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

    await waitFor(() => expect(result.current.isSuccess).toEqual(true));

    expect(result.current.data).toBeDefined();
  });

  it("should invalidate data", async () => {
    const { result } = renderHook(() => useReport("test"), {
      wrapper: HigherWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toEqual(true));

    expect(result.current.data).toBeDefined();

    act(() => {
      queryClient.invalidateQueries(reportKeys.report('test'))
    });

    await waitFor(() => result.current.isStale)

    await waitFor(() => result.current.isFetching);
    await waitFor(() => !result.current.isFetching);

    expect(result.current.data).toBeDefined();
  });
});
