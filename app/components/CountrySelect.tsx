import React from "react";
import Select from "react-select";
import useGetCountries from "../hooks/useGetCountries";
import { FormattedCountry } from "../interfaces/country.interface";

interface CountrySelectProps {
  value?: FormattedCountry;
  onChange: (value: FormattedCountry) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAllCountries } = useGetCountries();

  const placeHolder = (
    <div className="text-sm font-medium text-gray-400 flex align-center">
      <span>Choose a country</span>
    </div>
  );
  return (
    <div>
      <Select
        placeholder={placeHolder}
        isClearable
        options={getAllCountries()}
        value={value}
        onChange={(value) => onChange(value as FormattedCountry)}
        // https://stackoverflow.com/questions/66303440/react-select-options-shows-default-blue-background
        getOptionValue={(option) => option}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3"
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

export default CountrySelect;
