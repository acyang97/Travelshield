export interface FormattedCountry {
  isoCode: string;
  longitude: string;
  latitude: string;
  flag: string;
  name: string;
  value: string;
  label: string;
}

export interface FormattedCity {
  countryCode: string;
  longitude: string | null | undefined;
  latitude: string | null | undefined;
  name: string;
  value: string;
  label: string;
}
