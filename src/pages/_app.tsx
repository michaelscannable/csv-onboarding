import { type AppType, type AppProps } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type NextPageWithLayout } from "../types";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "sonner";
import { CSVProvider } from "~/context/csv-context";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session | null;
};

const MyApp: AppType<AppPropsWithLayout> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const getLayout = Component.getLayout ?? ((page: unknown) => page);
  return (
    <SessionProvider session={session}>
      <CSVProvider>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </CSVProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
