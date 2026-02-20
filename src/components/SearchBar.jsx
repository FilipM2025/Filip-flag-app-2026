import TextField from "@mui/material/TextField";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      label="Search for a country..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      fullWidth
      sx={{
        width: {
          xs: "100%",
          sm: 400,
        },
      }}
    />
  );
}