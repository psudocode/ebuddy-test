import { Box, Typography } from "@mui/material";
import { User } from "@repo/types";
import React from "react";
import KeyValuePlaceholder from "./keyValuePlaceholder";

const JsonView = ({ data }: { data: User | null }) => {
  if (!data) {
    return null;
  }
  return (
    <Box>
      <Typography variant="body2" color="white">
        USER DATA :
      </Typography>

      {Object.entries(data).map(([key, value]) => {
        if (typeof value === "object") {
          return (
            <KeyValuePlaceholder
              key={key}
              label={key}
              value={JSON.stringify(value)}
            />
          );
        }
        return <KeyValuePlaceholder key={key} label={key} value={value} />;
      })}
    </Box>
  );
};

export default JsonView;
