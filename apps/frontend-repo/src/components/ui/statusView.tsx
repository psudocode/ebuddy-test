"use client";

import { Box, Typography } from "@mui/material";

const StatusView = ({ text }: { text: string }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography variant="body2" color="white">
        FETCHING STATUS : {text}
      </Typography>
    </Box>
  );
};

export default StatusView;
