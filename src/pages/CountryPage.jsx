import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

async function fetchCountry(code) {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${code}`
  );
  if (!res.ok) throw new Error("Failed to fetch country");
  const data = await res.json();
  return data[0];
}

export default function CountryPage() {
  const { code } = useParams();

  const {
    data: country,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["country", code],
    queryFn: () => fetchCountry(code),
    enabled: !!code,
  });

  if (isLoading) return <Typography sx={{ p: 4 }}>Loading...</Typography>;
  if (error || !country)
    return <Typography sx={{ p: 4 }}>Country not found</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <img
        src={country.flags.svg}
        alt={country.name.common}
        style={{
          width: "100%",
          maxHeight: 300,
          objectFit: "contain",
        }}
      />

      <Typography variant="h4" fontWeight={800} mt={3}>
        {country.name.common}
      </Typography>

      <Typography>
        Population: {country.population.toLocaleString()}
      </Typography>
      <Typography>Region: {country.region}</Typography>
      <Typography>
        Capital: {country.capital?.[0] || "N/A"}
      </Typography>

      {country.borders?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography fontWeight={700} mb={1}>
            Border Countries:
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {country.borders.map((border) => (
              <Button
                key={border}
                component={RouterLink}
                to={`/country/${border}`}
                variant="outlined"
              >
                {border}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
