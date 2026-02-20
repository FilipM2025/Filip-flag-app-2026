import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import CountryCard from "../components/CountryCard";
import CountryCardSkeleton from "../components/CountryCardSkeleton";

async function fetchCountries() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  return res.json();
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const filteredCountries = data.filter((country) => {
    return (
      country.name.common.toLowerCase().includes(search.toLowerCase()) &&
      (region ? country.region === region : true)
    );
  });

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 4,
        }}
      >
        <SearchBar value={search} onChange={setSearch} />
        <RegionFilter value={region} onChange={setRegion} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }}
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <CountryCardSkeleton key={i} />
            ))
          : filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                code={country.cca3}
                name={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
                flag={country.flags.svg}
              />
            ))}
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 4 }}>
          Failed to load countries.
        </Typography>
      )}
    </Box>
  );
}