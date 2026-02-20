import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function CountryCard({
  name,
  population,
  region,
  capital,
  flag,
  code,
  sx,
}) {
  return (
    <Card
      component={RouterLink}
      to={`/country/${code}`}
      sx={{
        textAlign: "center",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        ...sx,
      }}
    >
      <CardMedia
        component="img"
        image={flag}
        alt={name}
        sx={{ width: "100%", height: "50%", borderRadius: 1 }}
      />
      <CardContent>
        <Typography fontWeight={700}>{name}</Typography>
        <Typography variant="body2">
          Population: {population.toLocaleString()}
        </Typography>
        <Typography variant="body2">Region: {region}</Typography>
        <Typography variant="body2">
          Capital: {capital || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}
