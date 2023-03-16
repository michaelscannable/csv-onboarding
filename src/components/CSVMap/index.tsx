import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { type AgGridEvent } from "ag-grid-community";
import { columnDefinitions } from "./definitions";
import CheckboxComponent from "../CheckboxComponent";
import { columnMatcher } from "./column-matcher";
import Modal from "../Modal";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useCSVContext } from "~/context/csv-context";
import { FileActionType } from "~/context/reducers/file.reducer";

const CSVMap: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const { state, dispatch } = useCSVContext();
  const { csvTemplate, importedColumnHeaders } = state;
  const router = useRouter();
  const importedColumns = columnMatcher({
    templateColumns: csvTemplate,
    toImportColumns: importedColumnHeaders,
  });

  const colDefs = columnDefinitions(csvTemplate, importedColumns, dispatch);

  const [duplicate, setDuplicate] = useState(false);

  const onGridReady = useCallback((params: AgGridEvent) => {
    window.addEventListener("resize", () =>
      setTimeout(() => params.api.sizeColumnsToFit())
    );
    params.api.sizeColumnsToFit();
  }, []);

  const onFirstDataRendered = useCallback(
    () => gridRef.current!.api.forEachNode((node) => node.setSelected(true)),
    []
  );

  const saveTemplate = useCallback(() => {
    const columnsToImport = importedColumns.filter(
      ({ is_imported }) => is_imported
    );

    const labels = columnsToImport.map(({ label }) => label);

    if (new Set(labels).size !== labels.length) {
      setDuplicate(true);
      return;
    }
    // update mapping
    dispatch({
      type: FileActionType.MAPPED_COLUMN_HEADERS,
      payload: columnsToImport,
    });

    void router.push("/grid");
  }, [dispatch, importedColumns, router]);
  console.log(state);
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: importedColumns.length * 54.25,
        width: "100%",
        border: "none",
      }}
    >
      <div className="flex justify-end gap-1 pb-2">
        <button
          onClick={() =>
            dispatch({ type: FileActionType.MOCK_DATA, payload: undefined })
          }
          type="button"
          className="rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Mock
        </button>
        <button
          onClick={saveTemplate}
          type="button"
          className="rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Save
        </button>
      </div>
      <AgGridReact
        ref={gridRef}
        columnDefs={colDefs}
        rowData={importedColumns}
        onGridReady={onGridReady}
        rowHeight={50}
        suppressHorizontalScroll={true}
        suppressRowClickSelection={true}
        rowSelection={"multiple"}
        onFirstDataRendered={onFirstDataRendered}
        components={{ checkboxRenderer: CheckboxComponent }}
      />
      {duplicate && <Modal closeModal={setDuplicate} />}
    </div>
  );
};

export default CSVMap;
