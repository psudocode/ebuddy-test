"use client";

import { loginThunk } from "@/stores/authSlice";
import { RootState, store } from "@/stores/store";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorLoginMessage, errorData } = useSelector(
    (state: RootState) => state.auth
  );
  const { dispatch } = store;

  useEffect(() => {
    // console.log(errorData);
  }, [errorData]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };

  return (
    <Card component="form" noValidate autoComplete="off">
      <CardContent>
        <Box>
          <Typography
            justifyContent={"center"}
            textAlign={"center"}
            variant="h1"
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 30 }}
          >
            Login
          </Typography>
          <Box height={50}>
            {errorLoginMessage && (
              <Typography
                justifyContent={"center"}
                textAlign={"center"}
                gutterBottom
                sx={{ color: "text.error" }}
              >
                {errorLoginMessage}
              </Typography>
            )}
          </Box>
          <Box>
            <Box className="mb-4">
              <TextField
                error={
                  errorData.find((error) => error.path === "email")
                    ? true
                    : false
                }
                helperText={
                  errorData.find((error) => error.path === "email")
                    ? errorData.find((error) => error.path === "email")?.msg
                    : ""
                }
                fullWidth
                required
                id="login-email"
                label="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <TextField
                error={
                  errorData.find((error) => error.path === "password")
                    ? true
                    : false
                }
                helperText={
                  errorData.find((error) => error.path === "password")
                    ? errorData.find((error) => error.path === "password")?.msg
                    : ""
                }
                fullWidth
                required
                id="login-password"
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
      <CardActions className="flex justify-center">
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          variant="contained"
          size="large"
          className="w-40"
        >
          Login
        </Button>
      </CardActions>

      <Box padding={2}>
        <Box>
          <Typography>email: didi@okke.com </Typography>
          <Typography>password: qwerty</Typography>
        </Box>
        <Typography
          justifyContent={"center"}
          textAlign={"center"}
          variant="h1"
          gutterBottom
          sx={{ color: "text.secondary", fontSize: 30 }}
        >
          Sample User Data
        </Typography>

        <Typography sx={{ fontSize: 10 }}>
          {JSON.stringify(
            {
              email: "didi@okke.com",
              name: "User A",
              numberOfRents: 30,
              password:
                "$2b$10$VjZAvk845LXJSnO0mjYM8eYpL/LSI/GzmkCDbej85j.4EXg2MhjOm",
              recentlyActive: "Firestore Timestamp",
              totalAverageWeightRatings: 4.3,
              username: "user_a",
            },
            null,
            2
          )}
        </Typography>
      </Box>
    </Card>
  );
};

export default LoginForm;
