import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MePage = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default MePage;
