"use client";

import Select from "react-select";
import { CATEGORIES_OPTIONS } from "@/app/constants/categories.constants";
import React, { Dispatch, SetStateAction } from "react";
import { Category } from "@/app/interfaces/category.interface";

interface Props {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
}

const CategoriesFilter: React.FC<Props> = ({ setCategories, categories }) => {
  const placeHolder = (
    <div className="text-sm font-medium text-gray-400 flex align-center">
      <span>Choose some categories</span>
    </div>
  );

  return (
    <div>
      <div>
        <h5 className="block mb-[8px] text-lg font-medium text-gray-900">
          Categories - What is your post about?
        </h5>
      </div>
      <Select
        placeholder={placeHolder}
        isMulti
        value={categories}
        onChange={(value) => {
          setCategories(value as Category[]);
        }}
        name="colors"
        options={CATEGORIES_OPTIONS}
        className="basic-multi-select"
        classNamePrefix="select"
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
        })}
      />
    </div>
  );
};

export default CategoriesFilter;
