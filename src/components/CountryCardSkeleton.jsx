import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

export default function CountryCardSkeleton({ sx }) {
  return (
    <Card sx={{ textAlign: "center", ...sx }}>
      <Skeleton variant="rectangular" height={50} />
      <CardContent>
        <Skeleton width="60%" />
        <Skeleton width="80%" />
        <Skeleton width="50%" />
      </CardContent>
    </Card>
  );
}
