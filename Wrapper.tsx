import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface WrapperProps {
  children?: ReactNode;
}

export let queryClient = {} as QueryClient

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
