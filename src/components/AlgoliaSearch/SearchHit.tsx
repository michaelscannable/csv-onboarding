import Image from "next/image";
import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import { type HitProp } from ".";

export interface SearchHitProps {
  hit: HitProp;
  closeSearch: () => void;
}

export function SearchHit(props: SearchHitProps) {
  const { hit } = props;
  return (
    <Combobox.Option
      value={hit}
      className={({ active }) =>
        classNames(
          "cursor-default select-none px-4 py-2",
          active && "bg-gray-100 text-white"
        )
      }
    >
      <div className="flex cursor-pointer flex-row p-2">
        <div className="relative h-12 w-12">
          <Image
            src={hit.image || "/images/placeholder.png"}
            alt={hit.name || "Product image"}
            fill
            className="rounded-md object-contain object-center"
          />
        </div>

        <div className="ml-4 mr-5 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>{hit.name || hit.code}</h3>
              <p className="ml-4">{hit.code}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">Code: {hit.code}</p>
            <p className="mt-1 text-sm text-gray-500">
              Manufacturer: {hit.manufacturer}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="hover:bg-black/2 h-8 rounded bg-black py-1 px-2 text-xs font-semibold text-white shadow-sm"
        >
          Update
        </button>
      </div>
    </Combobox.Option>
  );
}

export default SearchHit;
