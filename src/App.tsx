import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/system";
import { useInfiniteQuery } from "react-query";
import { fetchCommentsByPage, commentsKey } from "./api";
import { useIntersectionObserverRef } from "rooks";
import "./App.css";

const CardStyled = styled(Card)`
  max-width: 500px;
  min-width: 400px;
  width: 500px;
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
  const callback = (entries: { isIntersecting: any }[]) => {
    if (entries && entries[0]) {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    }
  };
  const [myRef] = useIntersectionObserverRef(callback);

  return (
    <div className="App">
      {isFetching && <p>Loading...</p>}
      {data && (
        <Grid
          rowSpacing={2}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          {data.pages.map((page, index) => {
            return (
              <Grid
                key={index}
                rowSpacing={2}
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                {page.map((comment) => {
                  return (
                    <Grid item key={comment.id}>
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
          {hasNextPage && (
            <Grid item ref={myRef}>
              <CardStyled>
                <CardHeader
                  avatar={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                  }
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  subheader={
                    <Skeleton animation="wave" height={10} width="60%" />
                  }
                />

                <CardContent>
                  <>
                    <Skeleton
                      animation="wave"
                      height={10}
                      style={{ marginBottom: 6 }}
                      width="90%"
                    />
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={10} width="90%" />
                  </>
                </CardContent>
              </CardStyled>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
}

export default App;
