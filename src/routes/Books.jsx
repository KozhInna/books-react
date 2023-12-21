import { useEffect, useState } from "react";
import useAxios from "../services/useAxios";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

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

//render all books together
function Books() {
  const [search, setSearch] = useState([]);

  const { data, loading, get } = useAxios("http://localhost:3000");
  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);
  console.log("data from books", data);

  // TODO: Replace axios with useAxios hook
  function getBooks() {
    get("books");
  }

  // TODO: Implement search functionality
  function handleSearch(e) {
    setSearch(e.target.value.toLowerCase());
  }
  console.log("search", search);

  const filteredArray = data.filter(
    (book) =>
      book.name.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
  );

  return (
    <>
      <TextField
        name="search"
        id="outlined-basic"
        label="search"
        variant="outlined"
        onChange={handleSearch}
        value={search}
      />

      <Box sx={{ mx: "auto", p: 2 }}>
        {loading && <CircularProgress />}
        {!loading && (
          <div>
            <Stack
              sx={{ justifyContent: "space-around" }}
              spacing={{ xs: 1 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              {filteredArray.map((book) => (
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "15%",
                    minWidth: 200,
                  }}
                  key={book.name}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    image={book.img}
                    title={book.name}
                  />
                  <Box sx={{ pt: 2, pl: 2 }}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
                  </Box>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      mt: "auto",
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={book.stars}
                      readOnly
                      size="small"
                    />
                    <Link to={`${book.name}`} size="small">
                      Learn More
                    </Link>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </div>
        )}
      </Box>
    </>
  );
}

export default Books;
