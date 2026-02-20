import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

async function fetchCountry(code) {
const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
if (!res.ok) throw new Error("Failed");
const data = await res.json();
return data[0];
}

async function fetchBorderCountries(codes) {
if (!codes || codes.length === 0) return [];
const res = await fetch(
`https://restcountries.com/v3.1/alpha?codes=${codes.join(",")}&fields=name,cca3`
);
if (!res.ok) return [];
return res.json();
}

export default function CountryPage() {
const { code } = useParams();

const { data: country, isLoading } = useQuery({
queryKey: ["country", code],
queryFn: () => fetchCountry(code),
enabled: !!code,
});

const { data: borderCountries = [] } = useQuery({
queryKey: ["borders", country?.borders],
queryFn: () => fetchBorderCountries(country.borders),
enabled: !!country?.borders?.length,
});

if (isLoading) return <Typography sx={{ p: 4 }}>Loading...</Typography>;
if (!country) return <Typography sx={{ p: 4 }}>Not found</Typography>;

return (
<Box sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, sm: 4 } }}>
<Button
component={RouterLink}
to="/"
variant="outlined"
sx={{ mb: 4, textTransform: "none", fontWeight: 600 }}
>
← Back
</Button>

<Box
sx={{
display: "flex",
flexDirection: { xs: "column", md: "row" },
gap: 6,
alignItems: { md: "center" },
}}
>
<Box
component="img"
src={country.flags.svg}
alt={country.name.common}
sx={{ width: "100%", maxWidth: 500, height: "auto", borderRadius: 1 }}
/>

<Box sx={{ flex: 1 }}>
<Typography variant="h4" fontWeight={800} mb={3}>
{country.name.common}
</Typography>

<Box
sx={{
display: "grid",
gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
gap: 1,
mb: 4,
}}
>
<Typography variant="body2">
<b>Native Name:</b>{" "}
{country.name.nativeName
? Object.values(country.name.nativeName)[0]?.common
: country.name.common}
</Typography>
<Typography variant="body2">
<b>Top Level Domain:</b> {country.tld?.join(", ") || "N/A"}
</Typography>
<Typography variant="body2">
<b>Population:</b> {country.population.toLocaleString()}
</Typography>
<Typography variant="body2">
<b>Currencies:</b>{" "}
{country.currencies
? Object.values(country.currencies)
.map((c) => c.name)
.join(", ")
: "N/A"}
</Typography>
<Typography variant="body2">
<b>Region:</b> {country.region}
</Typography>
<Typography variant="body2">
<b>Languages:</b>{" "}
{country.languages
? Object.values(country.languages).join(", ")
: "N/A"}
</Typography>
<Typography variant="body2">
<b>Sub Region:</b> {country.subregion || "N/A"}
</Typography>
<Typography variant="body2">
<b>Capital:</b> {country.capital?.[0] || "N/A"}
</Typography>
</Box>

{/* Border Countries */}
{country.borders?.length > 0 && (
<Box>
<Typography variant="body2" fontWeight={700} mb={1}>
Border Countries:
</Typography>
<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
{borderCountries.map((border) => (
<Button
key={border.cca3}
component={RouterLink}
to={`/country/${border.cca3}`}
variant="outlined"
size="small"
sx={{ textTransform: "none", fontSize: "0.75rem" }}
>
{border.name.common}
</Button>
))}
</Box>
</Box>
)}

{!country.borders?.length && (
<Typography variant="body2" color="text.secondary">
No border countries
</Typography>
)}
</Box>
</Box>
</Box>
);
}
