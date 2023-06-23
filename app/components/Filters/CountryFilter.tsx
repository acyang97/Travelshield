"use client";

import React, { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import useGetCountries from "@/app/hooks/useGetCountries";
import {
  FormattedCity,
  FormattedCountry,
} from "@/app/interfaces/country.interface";

interface CountrySelectProps {
  country: FormattedCountry | null;
  setCountry: Dispatch<SetStateAction<FormattedCountry | null>>;
  setCity: Dispatch<SetStateAction<FormattedCity | null>>;
}

const CountryFilter: React.FC<CountrySelectProps> = ({
  setCountry,
  country,
  setCity,
}) => {
  const { getAllCountries } = useGetCountries();

  const placeHolder = (
    <div className="text-sm font-medium text-gray-400 flex align-center">
      <span>Choose a country</span>
    </div>
  );
  return (
    <div>
      <h5 className="block mb-[5px] text-base font-medium text-gray-900">
        Country
      </h5>
      <Select
        placeholder={placeHolder}
        isClearable
        value={country}
        noOptionsMessage={() => (
          <div
            className="
        flex flex-row items-center gap-2"
          >
            <div>No countries</div>
          </div>
        )}
        options={getAllCountries()}
        onChange={(selectedValue) => {
          const country = selectedValue as FormattedCountry;
          setCountry(country);
          setCity(null);
        }}
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

export default CountryFilter;
