"use client";

import { Box, Typography } from "@mui/material";

const Loader = ({ text }: { text: string }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography variant="body2" color="white">
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
