"use client";

import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const queryClientRef = useRef<any>();
  ` `;
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <main>{children}</main>
    </QueryClientProvider>
  );
};

export default Layout;
