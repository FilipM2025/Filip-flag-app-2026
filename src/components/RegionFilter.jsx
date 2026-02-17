import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import arrowDownDark from "@/assets/arrow-down-dark.svg";
import arrowDownLight from "@/assets/arrow-down-light.svg";

export default function RegionFilter({ value, onChange, darkMode }) {
  return (
    <TextField
      label="Filter by Region"
      select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{ minWidth: 150 }}
      SelectProps={{
        IconComponent: () => (
          <img
            src={darkMode ? arrowDownLight : arrowDownDark}
            alt="Arrow"
            style={{ width: 11, height: 6 }}
          />
        ),
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
