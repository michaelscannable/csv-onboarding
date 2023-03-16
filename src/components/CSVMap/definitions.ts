import { type ColDef } from "ag-grid-community";
import { type IAction, type ImportRow } from "~/context/csv-context";
import { FileActionType } from "~/context/reducers/file.reducer";

export const columnDefinitions = (
  templateColumns: ImportRow[],
  toImportColumns: ImportRow[],
  dispatch: (action: IAction) => void
): ColDef[] => {
  return [
    {
      headerName: "CSV Column",
      resizable: true,
      field: "key",
      type: "nonEditableColumn",
      cellStyle: { backgroundColor: "	#F5F5F5" },
    },
    {
      headerName: "Template Column",
      resizable: true,
      field: "label",
      editable: true,
      cellStyle: { cursor: "pointer" },
      cellEditor: "agSelectCellEditor",
      singleClickEdit: true,
      cellEditorParams: {
        values: templateColumns.map((el) => el.label),
      },
      onCellValueChanged: (e: { data: unknown }) => {
        // dispatch({
        //   type: FileActionType.TEMPLATE_UPDATE,
        //   payload: e.data,
        // });
      },
      cellClass: (params: { value: unknown }) => {
        return toImportColumns.filter(
          ({ is_imported, label }) => is_imported && label === params.value
        ).length > 1
          ? "text-red-400 editable-grid-cell"
          : "editable-grid-cell";
      },
      cellRenderer: (params: { value: unknown }) => params.value,
    },
    {
      headerName: "Select Columns",
      resizable: true,
      field: "is_imported",
      cellStyle: { direction: "rtl" },
      cellRenderer: "checkboxRenderer",
      onCellValueChanged: (e: { data: unknown }) => {
        // dispatch({
        //   type: FileActionType.TEMPLATE_UPDATE,
        //   payload: e.data,
        // });
      },
    },
  ];
};
