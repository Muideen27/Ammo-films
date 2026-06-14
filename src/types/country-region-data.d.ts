declare module "country-region-data" {
  export type RawRegion = [string, string];
  export type RawCountry = [string, string, RawRegion[]];

  export const allCountries: RawCountry[];
}