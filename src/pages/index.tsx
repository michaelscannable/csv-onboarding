import CSVUpload from "~/components/CsvUpload";
import { getStandardLayout } from "~/components/layouts/StandardLayout";
import { useCSVContext } from "~/context/csv-context";
import { type NextPageWithLayout } from "~/types";

const Import: NextPageWithLayout = () => {
  const { state } = useCSVContext();
  const template = state.csvTemplate;

  return (
    <>
      <h1 className="sr-only">Import</h1>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-1-title">
            <h2 id="section-1-title">Import data</h2>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <CSVUpload />
              </div>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <section aria-labelledby="section-2-title">
            <h2 id="section-2-title">Fields</h2>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                {template?.map(({ label }) => (
                  <div key={label}>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Import;

Import.getLayout = getStandardLayout;
