import React from "react";
import Header from "~/components/Header";

import { type NextPageWithLayout } from "../../../types";

const StandardLayout: React.FunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-full">
      <Header />
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {children}
        </div>
      </main>
      {/* Footer */}
    </div>
  );
};

export default StandardLayout;

export const getStandardLayout: NextPageWithLayout["getLayout"] =
  function getLayout(page) {
    return <StandardLayout>{page}</StandardLayout>;
  };
