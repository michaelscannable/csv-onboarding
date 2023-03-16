import { Combobox } from "@headlessui/react";
import { type ICellEditorParams } from "ag-grid-community";
import algoliasearch from "algoliasearch/lite";
import {
  connectHits,
  connectSearchBox,
  InstantSearch,
} from "react-instantsearch-core";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SearchHit from "./SearchHit";
import { forwardRef, useEffect, useState } from "react";

export type HitProp = {
  objectID: string;
  code: string;
  image: string;
  manufacturer: string;
  name: string;
  productName: string;
};

const Hits = connectHits(({ hits }: { hits: HitProp[] }) => {
  if (hits.length === 0) {
    return <p className="p-4 text-sm text-gray-500">No results.</p>;
  }

  return hits.map((hit) => (
    <SearchHit key={hit.objectID} hit={hit} closeSearch={() => ({})} />
  ));
});
export const AlgoliaSearch = (props: ICellEditorParams) => {
  // export const AlgoliaSearch = forwardRef((props: ICellEditorParams, ref) => {
  console.log({ props });
  const [editing, setEditing] = useState(true);
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || "",
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ""
  );

  useEffect(() => {
    if (!editing) {
      props.stopEditing();
    }
  }, [editing]);

  const CustomSearchBox = connectSearchBox((searchProps) => {
    if (!searchProps.currentRefinement && props?.data["Name/Description"]) {
      searchProps.refine(props?.data["Name/Description"]);
    }

    return (
      <Combobox.Input
        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
        placeholder="Search..."
        // ref={ref}
        onChange={(event) => {
          searchProps.refine(event.target.value);
        }}
      />
    );
  });

  const handleEdit = (hit: HitProp) => {
    // update row value
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newData = {
      ...props.data,
      "Name/Description": hit.productName,
      Manufacturer: hit.manufacturer,
      "Part number": hit.code,
    };

    const rowNode = props.api!.getRowNode(`${props.rowIndex}`);

    rowNode?.setData(newData);

    setEditing(false);
  };

  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ""}
      >
        <Combobox onChange={(hit: HitProp) => handleEdit(hit)}>
          <div className="relative">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <CustomSearchBox />
          </div>
          <Combobox.Options
            static
            className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
          >
            <Hits />
          </Combobox.Options>
        </Combobox>
      </InstantSearch>
    </>
  );
};

AlgoliaSearch.displayName = "AlgoliaSearch";

export default AlgoliaSearch;
