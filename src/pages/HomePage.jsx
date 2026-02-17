import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries, fetchCountriesByRegion } from "@/lib/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchBar from "@/components/SearchBar";
import RegionFilter from "@/components/RegionFilter";
import CountryCard from "@/components/CountryCard";
import CountryCardSkeleton from "@/components/CountryCardSkeleton";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const { data: countries, isLoading, error } = useQuery({
    queryKey: ["countries", region],
    queryFn: () => {
      if (!region) return fetchAllCountries();
      return fetchCountriesByRegion(region);
    },
  });

  const filteredCountries = useMemo(() => {
    if (!countries || !Array.isArray(countries)) return [];
    if (!search.trim()) return countries;

    const searchLower = search.toLowerCase();
    return countries.filter((c) =>
      c.name.common.toLowerCase().includes(searchLower)
    );
  }, [countries, search]);

  useEffect(() => {
    setSearch("");
  }, [region]);

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(1, 1fr)",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    gap: 4,
  };

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: 3, py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: 2,
          mb: 6,
        }}
      >
        <SearchBar value={search} onChange={setSearch} />
        <RegionFilter value={region} onChange={setRegion} />
      </Box>

      {isLoading ? (
        <Box sx={gridStyles}>
          {Array.from({ length: 8 }).map((_, i) => (
            <CountryCardSkeleton key={i} />
          ))}
        </Box>
      ) : error ? (
        <Typography color="error">Failed to load countries.</Typography>
      ) : filteredCountries.length === 0 ? (
        <Typography align="center" sx={{ py: 10 }}>
          No countries found.
        </Typography>
      ) : (
        <Box sx={gridStyles}>
          {filteredCountries.map((country) => (
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
      )}
    </Box>
  );
}
