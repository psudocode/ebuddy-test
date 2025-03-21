import { Box, Typography } from "@mui/material";
import React from "react";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <Box marginBottom={2}>
      <Typography variant="h4" marginTop={2}>
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
