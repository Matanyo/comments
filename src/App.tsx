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
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";

const CardStyled = styled(Card)`
  max-width: 500px;
  min-width: 400px;
  width: 500px;
`;
const MainStyled = styled("main")`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.5rem;
  margin-top: 64px;
  padding-block: 1.4rem;
`;

function App() {
  const [commentsCount, setCommentsCount] = useState(0);
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
        onSuccess: ({ pages }) => {
          const totalComments = pages.reduce(
            (prev, total) => prev + total.length,
            0
          );
          setCommentsCount(totalComments);
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
      <Header commentsCount={commentsCount} totalComments={500} />

      {isFetching && <p>Loading...</p>}
      <MainStyled>
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
                <Grid item key={index}>
                  <Grid
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
      </MainStyled>
    </div>
  );
}

export default App;
