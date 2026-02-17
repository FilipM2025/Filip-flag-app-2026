// src/lib/api.js

// Välj de fält du behöver: name, flags, population, region, capital, cca3
const FIELDS = "name,flags,population,region,capital,cca3";

export const fetchAllCountries = async () => {
  const res = await fetch(`https://restcountries.com/v3.1/all?fields=${FIELDS}`);
  if (!res.ok) throw new Error(`Failed to fetch all countries: ${res.status}`);
  return res.json();
};

export const fetchCountriesByRegion = async (region) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/region/${region}?fields=${FIELDS}`
  );
  if (!res.ok) throw new Error(`Failed to fetch countries by region: ${res.status}`);
  return res.json();
};

  