import React, { useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { fetchUserDetail, returnBook } from "../../redux/slices/usersSlice";
import { Book, UserDetail as UserDetailType } from "../../redux/slices/types";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { userDetail, status } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetail(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleReturnBook = (bookId: number) => {
    if (userDetail) {
      dispatch(returnBook({ userId: userDetail.id, bookId }));
    }
  };

  if (status === "loading" || !userDetail) {
    return <CircularProgress />;
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
        {userDetail.currentBooks.map((book: Book) => (
          <Card key={book.id}>
            <CardContent>
              <Typography variant="subtitle1">{book.name}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleReturnBook(book.id)}
              >
                Return Book
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Typography variant="h6" gutterBottom>
        Past Borrowed Books:
      </Typography>
      <Stack spacing={2}>
        {userDetail.pastBooks.map((book: Book) => (
          <Card key={book.id}>
            <CardContent>
              <Typography variant="subtitle1">{book.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default UserDetail;
