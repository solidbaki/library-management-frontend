import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserDetail } from "../../redux/slices/usersSlice";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { userDetail, status } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetail(Number(id)));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (!userDetail) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          User not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        {userDetail.name}'s Details
      </Typography>

      <Typography variant="h6" gutterBottom>
        Currently Borrowed Books:
      </Typography>
      <Stack spacing={2} marginBottom={4}>
        {userDetail.currentBooks?.length > 0 ? (
          userDetail.currentBooks.map((book) => (
            <Card key={book.id}>
              <CardContent>
                <Typography variant="subtitle1">{book.name}</Typography>
                <Typography variant="body2">Author: {book.author}</Typography>
                <Typography variant="body2">Year: {book.year}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No currently borrowed books.</Typography>
        )}
      </Stack>

      <Typography variant="h6" gutterBottom>
        Previously Borrowed Books:
      </Typography>
      <Stack spacing={2}>
        {userDetail.pastBooks?.length > 0 ? (
          userDetail.pastBooks.map((book) => (
            <Card key={book.id}>
              <CardContent>
                <Typography variant="subtitle1">{book.name}</Typography>
                <Typography variant="body2">Author: {book.author}</Typography>
                <Typography variant="body2">Year: {book.year}</Typography>
                <Typography variant="body2">Rating: {book.score ?? "Not rated yet"}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No previous borrowed books.</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default UserDetail;
