import { City, ICity } from "country-state-city";
import { FormattedCity } from "../interfaces/country.interface";

const useGetCities = (countryCode: string) => {
  const getAllCities = (): FormattedCity[] | undefined => {
    if (City.getCitiesOfCountry(countryCode) === undefined) {
      return [];
    }
    return City.getCitiesOfCountry(countryCode)?.map((city) => ({
      countryCode: city?.countryCode,
      longitude: city?.longitude,
      latitude: city?.latitude,
      name: city?.name,
      value: city?.name,
      label: city?.name,
    }));
  };
  return {
    getAllCities,
  };
};

export default useGetCities;
