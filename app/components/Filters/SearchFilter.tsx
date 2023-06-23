"use client";

import { DebouncedFunc } from "lodash";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  debouncedSetSearchInput: DebouncedFunc<
    React.Dispatch<React.SetStateAction<string>>
  >;
  searchInput: string;
}

const SearchFilter: React.FC<Props> = ({
  searchInput,
  debouncedSetSearchInput,
}) => {
  const [valueToShow, setValueToShow] = useState(searchInput);
  return (
    <>
      <div className="mb-2">
        <label
          htmlFor="search"
          className="block mb-[8px] text-lg font-medium text-gray-900"
        >
          Search
        </label>
        <input
          id="search"
          type="title"
          value={valueToShow}
          onChange={(e) => {
            setValueToShow(e.target.value);
            debouncedSetSearchInput(e.target.value);
          }}
          className={`border border-[#cccccc] text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:outline-none focus:border-blue-600`}
          placeholder="Search for a post"
        />
      </div>
    </>
  );
};
export default SearchFilter;
