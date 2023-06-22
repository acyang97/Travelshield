import React from "react";

import Select from "react-select";
import { TAG_OPTIONS } from "../constants/tags.constants";
import { Tag } from "../interfaces/tag.interface";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  value?: Tag[] | null;
  onChange: (value: Tag[] | null) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TagSelect: React.FC<Props> = ({ value, onChange, register, errors }) => {
  const placeHolder = (
    <div className="text-sm font-medium text-gray-400 flex align-center">
      <span>Choose some tags</span>
    </div>
  );
  console.log("Does it exist???", errors["tags"]);
  const borderColor = errors["tags"] ? "border-red-500" : "border-black";
  return (
    <div>
      <div>
        <h5 className="block mb-[8px] text-lg font-medium text-gray-900">
          Tags - What is your post about?
        </h5>
      </div>
      <Select
        placeholder={placeHolder}
        defaultValue={TAG_OPTIONS[25]}
        isMulti
        {...register("tags", { minLength: 1, required: true })}
        onChange={(value) => {
          // hackish way
          if ((value as Tag[]).length === 0) {
            onChange(null);
          }
          onChange(value as Tag[]);
        }}
        name="colors"
        options={TAG_OPTIONS}
        className="basic-multi-select"
        classNamePrefix="select"
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
        })}
      />
      {errors["tags"] && (
        <p className="mt-[8px] text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">*Choose 1 tag minimally</span>
        </p>
      )}
    </div>
  );
};

export default TagSelect;
