import React, { useEffect } from "react";
import { Typography, CircularProgress, Box, Stack, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/slices/usersSlice";
import { useNavigate } from "react-router-dom";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {users.map((user) => (
            <Button
              key={user.id}
              variant="contained"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              {user.name}
            </Button>
          ))}
        </Stack>
      )}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/books")}
        style={{ marginTop: "20px" }}
      >
        Go to Book List
      </Button>
    </Box>
  );
};

export default UserList;
