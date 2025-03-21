"use client";

import { Box, Typography } from "@mui/material";
import { ValidationErrorDataItem } from "@repo/types";
import React from "react";

const ErrorView = ({ error }: { error: ValidationErrorDataItem[] }) => {
  if (error.length === 0) {
    return null;
  }
  return (
    <Box>
      <Typography variant="body2" color="white">
        ERROR :
      </Typography>
      {error.map((item) => (
        <Box key={item.path}>
          <Typography variant="body2" color="white">
            {item.msg}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ErrorView;
