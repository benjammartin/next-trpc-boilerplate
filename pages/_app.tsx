import type { AppType } from "next/app";
import { trpc } from "utils/trpc";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

const MyApp: AppType<{ session: SessionProviderProps["session"] }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
};
export default trpc.withTRPC(MyApp);
