import React, { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import useGetCities from "@/app/hooks/useGetCities";
import {
  FormattedCity,
  FormattedCountry,
} from "@/app/interfaces/country.interface";

interface Props {
  country: FormattedCountry | null;
  city: FormattedCity | null;
  setCity: Dispatch<SetStateAction<FormattedCity | null>>;
}

const CityFilter: React.FC<Props> = ({ country, city, setCity }) => {
  const countryCode = country !== null ? country.isoCode : "";
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
          City
        </h5>
      </div>
      <Select
        placeholder={placeHolder}
        isClearable
        options={allCities ?? []}
        value={city}
        noOptionsMessage={() => (
          <div
            className="
        flex flex-row items-center gap-2"
          >
            <div>No cities</div>
          </div>
        )}
        onChange={(selectedValue) => {
          const city = selectedValue as FormattedCity;
          setCity(city);
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

export default CityFilter;
