import TextField from "@mui/material/TextField";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      label="Search for a country..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{ minWidth: 400 }}
    />
  );
}
