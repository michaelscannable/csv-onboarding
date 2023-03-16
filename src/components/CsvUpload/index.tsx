import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import Papa, { type ParseResult } from "papaparse";
import { useRouter } from "next/router";
import { useCSVContext } from "~/context/csv-context";
import { FileActionType } from "~/context/reducers/file.reducer";
import { toast } from "sonner";

const options = {
  accept: {
    "text/csv": [".csv"],
  },
  maxFiles: 1,
  noClick: true,
  noKeyboard: true,
};

const CSVUpload = () => {
  const { state, dispatch } = useCSVContext();
  const router = useRouter();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      dispatch({
        type: FileActionType.ADD_FILE,
        payload: file,
      });

      Papa.parse(file, {
        worker: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (result: ParseResult<File>, file: File) => {
          const { meta } = result;
          dispatch({
            type: FileActionType.IMPORTED_COLUMN_HEADERS,
            payload: meta?.fields || [],
          });

          dispatch({
            type: FileActionType.ADD_CSV_ROWS,
            payload: result.data,
          });

          toast.success("File imported successfully");
          void router.push(`/map/`);
        },
      });
    },
    [router, dispatch]
  );
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    ...options,
    onDrop,
  });
  return (
    <div {...getRootProps()}>
      <label className="flex h-32 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none">
        <span className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="font-medium text-gray-600">
            <input hidden {...getInputProps()} />
            {!isDragActive ? (
              <>
                Drop files to Attach, or
                <button className="pl-1 text-black underline" onClick={open}>
                  browse
                </button>
              </>
            ) : (
              <>Drop files to Attach</>
            )}
          </span>
        </span>
      </label>
    </div>
  );
};

export default CSVUpload;
