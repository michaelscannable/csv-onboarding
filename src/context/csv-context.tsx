import React, { createContext, type Dispatch, useReducer } from "react";
import { schema } from "~/schema/onboarding-template";
import { type FileActionType, fileReducer } from "./reducers/file.reducer";

const schemaProperties = Object.keys(schema.properties).map((key) => ({
  key,
  label: key,
  is_imported: true,
}));

const initialState = {
  importedFile: null,
  importedColumnHeaders: [],
  importedRows: [],
  mappedColumns: [],
  csvTemplate: schemaProperties,
};

export type ImportRow = {
  key: string;
  label: string;
  is_imported: boolean;
};

export type IState = {
  importedFile: File | null;
  importedColumnHeaders: ImportRow[];
  importedRows: ImportRow[];
  csvTemplate: ImportRow[];
  mappedColumns: ImportRow[];
};

export interface IAction {
  type: FileActionType;
  payload: unknown;
}

const CSVContext = createContext<{
  state: IState;
  dispatch: Dispatch<IAction>;
}>({ state: initialState, dispatch: () => null });

const CSVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, initialState);

  return (
    <CSVContext.Provider value={{ state, dispatch }}>
      {children}
    </CSVContext.Provider>
  );
};

const useCSVContext = () => React.useContext(CSVContext);

export { CSVProvider, useCSVContext };
