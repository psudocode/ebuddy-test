"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { User, ValidationErrorDataItem } from "@repo/types";
import React, { FormEvent, useEffect, useState } from "react";

const UpdateForm = ({
  onSubmit,
  data,
  errors,
}: {
  onSubmit: (e: FormEvent, data: { name: string; username: string }) => void;
  data: User | null;
  errors: ValidationErrorDataItem[];
}) => {
  const [name, setName] = useState<string>(data?.name || "");
  const [username, setUsername] = useState<string>(data?.username || "");

  useEffect(() => {
    setName(data?.name || "");
    setUsername(data?.username || "");
  }, [data]);

  if (!data) return null;

  return (
    <Card component="form" sx={{ marginTop: 2 }}>
      <CardHeader title="Update Form" />
      <CardContent>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            error={errors.find((error) => error.path === "name") ? true : false}
            helperText={
              errors.find((error) => error.path === "name")
                ? errors.find((error) => error.path === "name")?.msg
                : ""
            }
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            error={
              errors.find((error) => error.path === "username") ? true : false
            }
            helperText={
              errors.find((error) => error.path === "username")
                ? errors.find((error) => error.path === "username")?.msg
                : ""
            }
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
      </CardContent>
      <CardActions className="flex justify-center">
        <Button
          type="submit"
          onClick={(e) => onSubmit(e, { name, username })}
          variant="contained"
          className="w-40"
        >
          Update User Data
        </Button>
      </CardActions>
    </Card>
  );
};

export default UpdateForm;
