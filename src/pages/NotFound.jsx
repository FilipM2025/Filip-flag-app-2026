import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function NotFound() {
  return (
    <Box sx={{ textAlign: "center", padding: 8 }}>
      <Typography variant="h3" fontWeight={800} gutterBottom>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        Sidan hittades inte
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ marginTop: 2 }}>
        Gå till startsidan
      </Button>
    </Box>
  );
}

export default NotFound;
