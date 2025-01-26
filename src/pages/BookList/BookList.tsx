import React, { useEffect } from "react";
import { Typography, CircularProgress, Box, Stack, Card, CardActionArea, CardContent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBooks } from "../../redux/slices/booksSlice";
import { useNavigate } from "react-router-dom";

const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, status } = useAppSelector((state) => state.books);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {books.map((book) => (
            <Card key={book.id}>
              <CardActionArea onClick={() => navigate(`/books/${book.id}`)}>
                <CardContent>
                  <Typography variant="subtitle1">{book.name}</Typography>
                  <Typography variant="subtitle2">Author: {book.author}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default BookList;
