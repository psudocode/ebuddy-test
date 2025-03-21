"use client";

import PageHeader from "@/components/ui/pageHeader";
import StatusView from "@/components/ui/statusView";
import { RootState, store } from "@/stores/store";
import { fetchUsersThunk } from "@/stores/userSlice";
import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const UpdateFormPage = () => {
  const status = useSelector(
    (state: RootState) => state.user.usersFetchingStatus
  );
  const users = useSelector((state: RootState) => state.user.users);
  const { dispatch } = store;

  const handleFetchUsers = () => {
    // we process the update here instead of in the form component
    dispatch(fetchUsersThunk());
  };

  return (
    <Container>
      <PageHeader title="Priority Fetch" />
      <Box marginBottom={2}>
        <Button
          type="button"
          onClick={() => handleFetchUsers()}
          variant="contained"
          className="w-40"
        >
          Fetch User Data
        </Button>
      </Box>
      <Box bgcolor={"#333"} borderRadius={2} marginBottom={2} padding={2}>
        <StatusView text={status} />
      </Box>
      <Box>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </Box>
    </Container>
  );
};

export default UpdateFormPage;
