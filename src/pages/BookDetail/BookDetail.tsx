import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import {
  fetchBookDetail,
  lendBook,
} from "../../redux/slices/booksSlice";
import { fetchUsers } from "../../redux/slices/usersSlice";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Select,
  MenuItem,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { User, BookDetail as BookDetailType } from "../../redux/slices/types";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { bookDetail, status: bookStatus } = useAppSelector((state) => state.books);
  const { users, status: userStatus } = useAppSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    if (id) {
      dispatch(fetchBookDetail(parseInt(id)));
      dispatch(fetchUsers());
    }
  }, [dispatch, id]);

  const handleLendBook = () => {
    if (bookDetail && selectedUser) {
      dispatch(lendBook({ bookId: bookDetail.id, userId: parseInt(selectedUser) }))
        .unwrap()
        .then(() => {
          alert("Book successfully lent!");
        })
        .catch((err) => {
          console.error("Error lending book:", err);
        });
    }
  };

  if (bookStatus === "loading" || userStatus === "loading") {
    return <CircularProgress />;
  }

  if (!bookDetail) {
    return <Typography variant="h6">Book not found.</Typography>;
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        {bookDetail.name}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">Author: {bookDetail.author}</Typography>
          <Typography variant="subtitle1">Year: {bookDetail.year}</Typography>
          <Typography variant="subtitle1">
            Current Owner:{" "}
            {bookDetail.currentOwner
              ? bookDetail.currentOwner.name
              : "Available"}
          </Typography>
        </CardContent>
      </Card>

      <Box marginTop={4}>
        <Typography variant="h6" gutterBottom>
          Lend this book
        </Typography>
        <Stack spacing={2}>
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a user
            </MenuItem>
            {users.map((user: User) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLendBook}
            disabled={!selectedUser}
          >
            Lend Book
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BookDetail;
