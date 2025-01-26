// src/pages/UserList/UserList.tsx
import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/slices/usersSlice";
import { useNavigate } from "react-router-dom";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, status } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom align="center">
        Users List
      </Typography>
      <Stack spacing={2}>
        {users.map((user) => (
          <Card key={user.id}>
            <CardActionArea onClick={() => navigate(`/users/${user.id}`)}>
              <CardContent>
                <Typography variant="subtitle1">{user.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/books")}
          style={{ marginTop: "20px" }}
        >
          Go to Book List
        </Button>
      </Stack>
    </Box>
  );
};

export default UserList;
