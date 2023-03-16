import CSVMap from "~/components/CSVMap";
import { getStandardLayout } from "~/components/layouts/StandardLayout";
import { type NextPageWithLayout } from "~/types";

const MapPage: NextPageWithLayout = () => {
  return <CSVMap />;
};

export default MapPage;

MapPage.getLayout = getStandardLayout;
