import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { fetchBookDetail, lendBook } from "../../redux/slices/booksSlice";
import { fetchUsers } from "../../redux/slices/usersSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { bookDetail } = useAppSelector((state) => state.books);
  const { users } = useAppSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchBookDetail(parseInt(id)));
    }
    dispatch(fetchUsers());
  }, [dispatch, id]);

  const handleLendBook = () => {
    if (selectedUser) {
      dispatch(lendBook({ userId: parseInt(selectedUser), bookId: parseInt(id!) }))
        .unwrap()
        .then(() => alert("Book lent successfully"))
        .catch((err) => console.error(err));
    }
  };

  return (
    <Box padding={2}>
      {bookDetail && (
        <>
          <Typography variant="h4">{bookDetail.name}</Typography>
          <Card>
            <CardContent>
              <Typography>Author: {bookDetail.author}</Typography>
              <Typography>Year: {bookDetail.year}</Typography>
              <Typography>
                Current Owner:{" "}
                {bookDetail.currentOwner ? bookDetail.currentOwner.name : "Available"}
              </Typography>
            </CardContent>
          </Card>
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">Select User</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleLendBook} variant="contained" color="primary">
            Lend Book
          </Button>
        </>
      )}
    </Box>
  );
};

export default BookDetail;
