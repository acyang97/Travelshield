"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  label?: string;
  errors: FieldErrors;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  useTextArea?: boolean;
  textAreaRows?: number;
  borderRadius?: string;
}
const Input: React.FC<Props> = ({
  id,
  label,
  errors,
  register,
  placeholder,
  useTextArea,
  borderRadius,
  textAreaRows,
}) => {
  return (
    <>
      <div className="mb-2">
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            {label}
          </label>
        )}
        {useTextArea ? (
          <textarea
            rows={textAreaRows ? textAreaRows : 5}
            id={id}
            {...register(id, { required: true })}
            className={`border text-gray-900 text-sm block w-full p-2.5 outline-none focus:outline-none
            ${borderRadius ? borderRadius : "rounded-lg"}
            ${errors[id] ? "border-rose-500" : "border-gray-300"}
            ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
          `}
            placeholder={placeholder ? placeholder : ""}
          />
        ) : (
          <input
            id={id}
            {...register(id, { required: true })}
            type="title"
            className={`border text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:outline-none
        ${errors[id] ? "border-rose-500" : "border-gray-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}

      `}
            placeholder={placeholder ? placeholder : ""}
          />
        )}

        {errors[id] && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">*Required</span>
          </p>
        )}
      </div>{" "}
    </>
  );
};
export default Input;
