"use client";

import PageHeader from "@/components/ui/pageHeader";
import StatusView from "@/components/ui/statusView";
import UpdateForm from "@/components/updateForm";
import { RootState, store } from "@/stores/store";
import { fetchMeThunk, updateMeThunk } from "@/stores/userSlice";
import { Box, Container } from "@mui/material";
import React, { FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";

const UpdateFormPage = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const status = useSelector((state: RootState) => state.user.meUpdatingStatus);
  const errors = useSelector(
    (state: RootState) => state.user.errorUpdatingData
  );
  const { dispatch } = store;

  const handleUpdateUser = (
    e: FormEvent,
    data: { name: string; username: string }
  ) => {
    e.preventDefault();
    // we process the update here instead of in the form component
    dispatch(updateMeThunk(data));
  };

  useEffect(() => {
    if (!me) {
      dispatch(fetchMeThunk());
    }
  }, [me, dispatch]);

  return (
    <Container>
      <PageHeader title="Update Form" />
      <Box bgcolor={"#333"} borderRadius={2} marginBottom={2} padding={2}>
        <StatusView text={status} />
      </Box>
      <UpdateForm
        onSubmit={(e, newData) => handleUpdateUser(e, newData)}
        data={me}
        errors={errors}
      />
    </Container>
  );
};

export default UpdateFormPage;
