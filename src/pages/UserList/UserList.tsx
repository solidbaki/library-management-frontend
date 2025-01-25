import React, { useEffect } from "react";
import { Typography, CircularProgress, Box, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/slices/usersSlice";
import UserCard from "../../components/UserCard/UserCard";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          Failed to load users. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Stack spacing={2}>
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </Stack>
    </Box>
  );
};

export default UserList;
