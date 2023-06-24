import React from "react";

import Select from "react-select";
import { CATEGORIES_OPTIONS } from "../constants/categories.constants";
import { Category } from "../interfaces/category.interface";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  value?: Category[] | null;
  onChange: (value: Category[] | null) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const CategorySelect: React.FC<Props> = ({ onChange, register, errors }) => {
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
        defaultValue={CATEGORIES_OPTIONS[27]}
        isMulti
        {...register("categories", { minLength: 1, required: true })}
        onChange={(value) => {
          // hackish way since array somehow does not work
          if ((value as Category[]).length === 0) {
            onChange(null);
          }
          onChange(value as Category[]);
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
      {errors["categories"] && (
        <p className="mt-[8px] text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">*Choose 1 category minimally</span>
        </p>
      )}
    </div>
  );
};

export default CategorySelect;
