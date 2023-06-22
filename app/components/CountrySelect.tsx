import React from "react";
import Select from "react-select";
import useGetCountries from "../hooks/useGetCountries";
import { FormattedCountry } from "../interfaces/country.interface";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface CountrySelectProps {
  value?: FormattedCountry;
  onChange: (value: FormattedCountry) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  register,
  errors,
}) => {
  const { getAllCountries } = useGetCountries();

  const placeHolder = (
    <div className="text-sm font-medium text-gray-400 flex align-center">
      <span>Choose a country</span>
    </div>
  );
  return (
    <div>
      <h5 className="block mb-[8px] text-lg font-medium text-gray-900">
        Country
      </h5>
      <Select
        placeholder={placeHolder}
        isClearable
        options={getAllCountries()}
        {...register("country", { required: true })}
        value={value}
        onChange={(value) => onChange(value as FormattedCountry)}
        // https://stackoverflow.com/questions/66303440/react-select-options-shows-default-blue-background
        getOptionValue={(option) => option}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-2"
          >
            <div>{option.flag}</div>
            <div>{option.name}</div>
          </div>
        )}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
        })}
      />
      {errors["country"] && (
        <p className="mt-[8px] text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">*Required</span>
        </p>
      )}
    </div>
  );
};

export default CountrySelect;
