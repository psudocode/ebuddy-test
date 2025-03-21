import { Box, Typography } from "@mui/material";
import React from "react";

const KeyValuePlaceholder = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Box>
      <Typography variant="subtitle1" color="white" fontWeight={"bold"}>
        {label}
      </Typography>
      <Typography variant="body2" color="#eee" sx={{ marginBottom: 1 }}>
        {value}
      </Typography>
    </Box>
  );
};

export default KeyValuePlaceholder;
