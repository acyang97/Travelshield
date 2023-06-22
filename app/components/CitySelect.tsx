import React from "react";
import Select from "react-select";
import { FormattedCity } from "../interfaces/country.interface";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import useGetCities from "../hooks/useGetCities";

interface Props {
  countryCode: string;
  value?: FormattedCity;
  onChange: (value: FormattedCity) => void;
  register: UseFormRegister<FieldValues>;
}

const CitySelect: React.FC<Props> = ({
  value,
  onChange,
  register,
  countryCode,
}) => {
  const { getAllCities } = useGetCities(countryCode);
  const allCities = getAllCities();
  const placeHolder = (
    <div className="text-sm font-medium text-gray-400 flex align-center">
      <span>Choose a city</span>
    </div>
  );
  return (
    <div>
      <div>
        <h5 className="block mb-[8px] text-lg font-medium text-gray-900">
          City (Optional)
        </h5>
      </div>
      <Select
        placeholder={placeHolder}
        isClearable
        options={allCities ?? []}
        {...register("city", { required: false })}
        value={value}
        onChange={(value) => onChange(value as FormattedCity)}
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
    </div>
  );
};

export default CitySelect;
