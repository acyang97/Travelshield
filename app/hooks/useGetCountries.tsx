import { Country, State, City } from "country-state-city";
import { FormattedCountry } from "../interfaces/country.interface";

const formattedCountries: FormattedCountry[] = Country.getAllCountries().map(
  (country) => ({
    flag: country.flag,
    isoCode: country.isoCode,
    latitude: country.latitude,
    longitude: country.longitude,
    name: country.name,
    value: country.name,
    label: country.name,
  })
);

const useGetCountries = () => {
  const getAllCountries = () => formattedCountries;
  return {
    getAllCountries,
  };
};

export default useGetCountries;
