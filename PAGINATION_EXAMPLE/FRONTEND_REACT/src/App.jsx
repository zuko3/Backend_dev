import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaginationPosts,
  setLimit,
  setPageNum,
  setStatus,
} from "./paginationPostSlice";

const App = () => {
  const dispatch = useDispatch();
  const IDLE = "idle";
  const { items, status, error, limit, pageNum } = useSelector(
    (state) => state.paginationPosts
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPaginationPosts({ pageNum, limit }));
    }
  }, [status, dispatch, pageNum, limit]);

  if (status === "idle") return <p>Loading...</p>;
  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <p>
        PageNo: {pageNum}
        &nbsp; &nbsp;Limit: {limit}
        &nbsp;&nbsp;TotalPagesCount:
        {items.pagination.pageCount}
      </p>
      <p>
        Page:&nbsp;
        <select
          value={pageNum}
          onChange={(event) => {
            dispatch(setStatus(IDLE));
            dispatch(setPageNum(event.target.value));
          }}
        >
          {[...Array(items.pagination.pageCount).keys()].map((count) => (
            <option key={count + 1} value={count + 1}>
              {count + 1}
            </option>
          ))}
        </select>
        &nbsp;&nbsp;Limits:&nbsp;
        <select
          value={limit}
          onChange={(event) => {
            dispatch(setStatus(IDLE));
            dispatch(setLimit(event.target.value));
          }}
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </p>
      <ul>
        {items.posts.map((post) => (
          <li key={post.id}>
            {post.email} - {post.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
