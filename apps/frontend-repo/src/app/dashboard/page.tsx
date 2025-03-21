"use client";

// import ErrorView from "@/components/ui/errorView";
import JsonView from "@/components/ui/jsonView";
import StatusView from "@/components/ui/statusView";
import { fetchMeThunk } from "@/stores/userSlice";
import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "@/stores/store";
import PageHeader from "@/components/ui/pageHeader";

const Dashboard = () => {
  const { dispatch } = store;
  const userData = useSelector((state: RootState) => state.user.me);
  const status = useSelector((state: RootState) => state.user.meFetchingStatus);

  const handleFetchUser = () => {
    dispatch(fetchMeThunk());
  };
  return (
    <Container>
      <PageHeader title="Dashboard" />
      <Box marginBottom={2}>
        <Button
          type="button"
          onClick={() => handleFetchUser()}
          variant="contained"
          className="w-40"
        >
          Fetch User Data
        </Button>
      </Box>
      <Box bgcolor={"#333"} borderRadius={2} marginBottom={2} padding={2}>
        <StatusView text={status} />
      </Box>
      {userData && (
        <Box bgcolor={"#333"} borderRadius={2} padding={2}>
          <JsonView data={userData} />
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
