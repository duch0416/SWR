import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

if (!(typeof window === "undefined")) {
  const { worker } = require("../browser");
  worker.start();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        errorRetryCount: 3,
        // dedupingInterval: 1000 * 60 * 10
        // dedupingInterval: Should we use deduping Interval and what initial value would we like to have 10minutes ?
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
