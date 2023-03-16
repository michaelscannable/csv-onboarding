import CsvGridView from "~/components/CsvGridView";
import { getFullLayout } from "~/components/layouts/FullLayout";
import { type NextPageWithLayout } from "~/types";

const CSVGridViewPage: NextPageWithLayout = () => {
  return <CsvGridView />;
};

export default CSVGridViewPage;
CSVGridViewPage.getLayout = getFullLayout;
