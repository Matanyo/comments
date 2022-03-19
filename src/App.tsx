import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/system";
import { useInfiniteQuery } from "react-query";
import { fetchCommentsByPage, commentsKey } from "./api";
import "./App.css";

const CardStyled = styled(Card)`
  max-width: 500px;
`;

function App() {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      commentsKey,
      ({ pageParam }) => {
        return fetchCommentsByPage({ pageParam });
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.length === 0) return false;
          return allPages.length + 1;
        },
      }
    );

  return (
    <div className="App">
      {isFetching && <p>Loading...</p>}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>load more</button>
      )}

      {JSON.stringify(hasNextPage)}
      {data && (
        <div>
          {data.pages.map((page, index) => {
            return (
              <Grid
                spacing={2}
                columnSpacing={2}
                rowSpacing={2}
                key={index}
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                {page.map((comment) => {
                  return (
                    <Grid item>
                      <CardStyled>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="recipe">
                              {comment.email[0]}
                            </Avatar>
                          }
                          title={comment.name}
                          subheader={comment.email}
                        />
                        <CardContent>
                          <Typography variant="body2">
                            {comment.body}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                        </CardActions>
                      </CardStyled>
                    </Grid>
                  );
                })}
              </Grid>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
