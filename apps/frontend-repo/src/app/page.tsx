"use client";

import React, { useEffect } from "react";
import { Grid2 as Grid } from "@mui/material";
import LoginForm from "../components/loginForm";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { redirect } from "next/navigation";

export default function Home() {
  const { isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLogin) {
      redirect("/dashboard");
    }
  }, [isLogin]);

  return (
    <Grid
      container
      spacing={3}
      bgcolor="primary.main"
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid size={{ xs: 12, sm: 6, md: 4 }} padding={3}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}
