import { type IAction, type IState } from "../csv-context";
import { mockContext } from "../mock";
// import { Analyzer } from "type-analyzer";

export enum FileActionType {
  ADD_FILE = "ADD_FILE",
  IMPORTED_COLUMN_HEADERS = "COLUMN_HEADERS",
  MAPPED_COLUMN_HEADERS = "MAPPED_COLUMN_HEADERS",
  ADD_CSV_ROWS = "ADD_CSV_ROWS",
  TEMPLATE_UPDATE = "TEMPLATE_UPDATE",
  MOCK_DATA = "MOCK_DATA",
}

// TODO: fix this
export const fileReducer: IState = (state: IState, action: IAction) => {
  switch (action.type) {
    case FileActionType.ADD_FILE:
      return { ...state, importedFile: action.payload };
    case FileActionType.ADD_CSV_ROWS:
      return { ...state, importedRows: action.payload };
    case FileActionType.IMPORTED_COLUMN_HEADERS:
      const headers = action.payload as string[];
      return {
        ...state,
        importedColumnHeaders: headers.map((key) => ({
          key,
          label: key,
        })),
      };
    case FileActionType.TEMPLATE_UPDATE:
      return { ...state, map: action.payload };
    case FileActionType.MOCK_DATA:
      return {
        ...state,
        ...mockContext,
      };
    case FileActionType.MAPPED_COLUMN_HEADERS:
      const mappedHeaders = action.payload as { key: string; label: string }[];

      return {
        ...state,
        mappedColumns: mappedHeaders.map(({ key, label }) => ({
          key,
          label,
          is_imported: true,
        })),
      };
    default:
      return state;
  }
};

const sampleRows = (state: IState, action: IAction) => {
  // const colMeta = Analyzer.computeColMeta(action.payload.sampleData);
};
