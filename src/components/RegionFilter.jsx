import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function RegionFilter({ value, onChange }) {
  return (
    <TextField
      label="Filter by Region"
      select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{
        width: {
          xs: "100%",
          sm: 200,
        },
      }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="Africa">Africa</MenuItem>
      <MenuItem value="Americas">Americas</MenuItem>
      <MenuItem value="Asia">Asia</MenuItem>
      <MenuItem value="Europe">Europe</MenuItem>
      <MenuItem value="Oceania">Oceania</MenuItem>
    </TextField>
  );
}