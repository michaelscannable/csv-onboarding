import { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  type ColDef,
  type CellValueChangedEvent,
  type GetRowIdFunc,
  type GetRowIdParams,
  type CellClassParams,
  type CellEditorSelectorResult,
  type ICellEditorParams,
} from "ag-grid-community";
import { toast } from "sonner";
import { useCSVContext } from "~/context/csv-context";
import { FileActionType } from "~/context/reducers/file.reducer";
import { isNullValueBySchema, hasErrorBySchema } from "./validation";
import AlgoliaSearch from "../AlgoliaSearch";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const cellEditorSelector: (
  params: ICellEditorParams
) => CellEditorSelectorResult | undefined = (params: ICellEditorParams) => {
  if (params.colDef.headerName === "Part number") {
    return {
      component: AlgoliaSearch,
      popup: true,
      popupPosition: "over",
    };
  }
  return undefined;
};

const CSVGridView: React.FC = () => {
  const { state, dispatch } = useCSVContext();
  const { importedRows, mappedColumns } = state;

  const gridRef = useRef<AgGridReact>(null);
  const defaultColDef = useMemo<ColDef>(
    () => ({
      flex: 1,
      resizable: true,
      cellClassRules: {
        "cell-fail": ({ colDef, value }: CellClassParams) =>
          hasErrorBySchema(colDef.field, value),
        "null-check": ({ colDef, value }: CellClassParams) =>
          isNullValueBySchema(colDef.field, value),
      },
      cellEditorSelector,
    }),
    []
  );

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "Row",
      valueGetter: "node.rowIndex + 1",
      maxWidth: 70,
    },
    ...mappedColumns.map(({ key }) => {
      return {
        headerName: key,
        field: key,
        editable: true,
      };
    }),
  ]);

  const onCellValueChanged = useCallback(
    ({ data }: CellValueChangedEvent) => {
      gridRef.current?.api?.showLoadingOverlay();
      gridRef.current?.api?.hideOverlay();
    },
    [gridRef]
  );

  const saveTemplate = useCallback(() => {
    toast.success("Template saved");
  }, []);

  const downloadTemplate = useCallback(() => {
    toast.success("Getting ready to download");
    gridRef.current!.api.exportDataAsCsv();
    toast.success("Template downloaded");
  }, []);

  useEffect(() => {
    if (mappedColumns) {
      setColumnDefs([
        {
          headerName: "Row",
          valueGetter: "node.rowIndex + 1",
          maxWidth: 70,
        },
        ...mappedColumns.map(({ key }) => {
          return {
            headerName: key,
            field: key,
            editable: true,
          };
        }),
      ]);
    }
  }, [mappedColumns]);

  return (
    <div className="ag-theme-alpine h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
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
            onClick={downloadTemplate}
            type="button"
            className="rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Download
          </button>
          <button
            onClick={saveTemplate}
            type="button"
            className="rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Upload
          </button>
        </div>
      </div>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        // getRowId={getRowId}
        onCellValueChanged={onCellValueChanged}
        rowData={importedRows}
      />
    </div>
  );
};

export default CSVGridView;
