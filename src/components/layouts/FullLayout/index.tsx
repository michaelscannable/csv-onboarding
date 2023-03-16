import React from "react";
import Header from "~/components/Header";
import { type NextPageWithLayout } from "../../../types";

const FullLayout: React.FunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-full">
      <Header />
      <main className="-mt-24 pb-8">
        <div className="mx-auto w-full px-8">{children}</div>
      </main>
      {/* Footer */}
    </div>
  );
};

export default FullLayout;

export const getFullLayout: NextPageWithLayout["getLayout"] =
  function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
  };
