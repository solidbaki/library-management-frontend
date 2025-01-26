import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { fetchUserDetail, returnBook } from "../../redux/slices/usersSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { userDetail } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetail(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleReturnBook = (bookId: number) => {
    dispatch(returnBook({ userId: parseInt(id!), bookId }))
      .unwrap()
      .then(() => alert("Book returned successfully"))
      .catch((err) => console.error(err));
  };

  return (
    <Box padding={2}>
      {userDetail && (
        <>
          <Typography variant="h4">{userDetail.name}'s Details</Typography>
          <Typography variant="h6">Currently Borrowed Books:</Typography>
          <Stack spacing={2} marginBottom={4}>
            {userDetail.currentBooks.map((book) => (
              <Card key={book.id}>
                <CardContent>
                  <Typography>{book.name}</Typography>
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
        </>
      )}
    </Box>
  );
};

export default UserDetail;
