"use client";

import MainAppBar from "@/components/ui/mainAppBar";
import { RootState } from "@/stores/store";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isLogin) {
      redirect("/");
    }
  }, [isLogin]);

  return (
    <Box>
      <MainAppBar />
      {children}
    </Box>
  );
};

export default Layout;
