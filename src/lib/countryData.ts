import { allCountries } from "country-region-data";

interface Region {
  name: string;
  shortCode: string;
}

interface Country {
  countryName: string;
  countryShortCode: string;
  regions: Region[];
}

// List of African country short codes (ISO 3166-1 alpha-2)
const AFRICAN_COUNTRY_CODES = [
  "DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CD", "CG", "CI", "DJ",
  "EG", "GQ", "ER", "SZ", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY",
  "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC",
  "SL", "SO", "ZA", "SS", "SD", "TZ", "TG", "TN", "UG", "ZM", "ZW"
];

export const getAfricanCountries = (): Country[] => {
  const africanCountries = allCountries
    .map(([countryName, countryShortCode, regions]) => ({
      countryName,
      countryShortCode,
      regions: regions.map(([name, shortCode]) => ({ name, shortCode })),
    }))
    .filter((country) => AFRICAN_COUNTRY_CODES.includes(country.countryShortCode));

  // Sort by country name for better UX
  return africanCountries.sort((a, b) => a.countryName.localeCompare(b.countryName));
};

export const getRegionsByCountryCode = (countryCode: string): Region[] => {
  const countryData = allCountries.find(([, shortCode]) => shortCode === countryCode);
  if (!countryData) {
    return [];
  }
  const regions = countryData[2] as [string, string][];
  return regions.map(([name, shortCode]) => ({ name, shortCode }));
};
