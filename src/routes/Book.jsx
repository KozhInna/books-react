import { useEffect } from "react";
import useAxios from "../services/useAxios";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

function Book() {
  const urlBookName = useParams();
  console.log("UseParam", urlBookName);

  const { data, get } = useAxios("http://localhost:3000");

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);
  function getBooks() {
    get("books");
  }
  console.log("datafromSinglePage", data);

  let book = data.find((el) => el.name === urlBookName.book);

  console.log("bookFound", book);
  return (
    <>
      {data.length !== 0 && (
        <div>
          <CardMedia
            sx={{ height: 250, width: 200 }}
            image={book.img}
            title={book.name}
          />
          <Box sx={{ pt: 2, pl: 2 }}>
            {book.genres.map((genre, i) => (
              <Chip key={i} label={genre} variant="outlined" size="small" />
            ))}
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
              {book.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {book.author}
            </Typography>
          </Box>{" "}
        </div>
      )}
    </>
  );
}

export default Book;
