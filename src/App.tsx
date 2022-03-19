import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchCommentsByPage, commentsKey } from "./api";
import "./App.css";

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
              <div key={index}>
                {page.map((comment) => {
                  return <div key={comment.id}>{comment.body}</div>;
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
