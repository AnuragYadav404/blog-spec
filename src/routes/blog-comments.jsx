import { useState } from "react";
import { useFetcher } from "react-router-dom";

// to implement
// 0. add authentication check
// 1. loading state handling
// 2. pagination
// 3. post handling for comment submission

export async function loader({ request, params }) {
  const blogID = params.blogID;
  console.log(blogID);
  try {
    const isAuthResponse = await fetch(
      `http://localhost:3000/users/isLoggedIn`
    );
    const isAuth = await isAuthResponse.json();
    const fetchCommentsResponse = await fetch(
      `http://localhost:3000/articles/${params.blogID}/comments`
    );
    const commentsObj = await fetchCommentsResponse.json();
    console.log(commentsObj);
    if (commentsObj.statusCode == 200) {
      return {
        comments: commentsObj.comments,
        isAuth: isAuth.status,
      };
    } else {
      throw new Error(commentsObj.msg);
    }
  } catch (err) {
    console.log("Error");
    const error = new Error();
    error.message = err.message;
    throw error;
  }
}

export default function BlogComments({ blogID }) {
  const [showComments, setShowComments] = useState(false);
  const fetcher = useFetcher();

  function handleHideComments() {
    setShowComments(false);
  }

  function handleShowComments() {
    fetcher.load(`/blogs/${blogID}/comments`);
    setShowComments(true);
  }

  const commentsData = fetcher.data;

  return (
    <div id="blog-comments">
      <h2>Comments</h2>
      {/* 2 buttons -> hide and show */}
      {/* first show button -> this button is a form */}
      {!showComments && (
        <button onClick={handleShowComments}>Show Comments</button>
      )}
      {showComments && (
        <button name="hideComments" onClick={handleHideComments}>
          Hide Comments
        </button>
      )}
      {showComments && commentsData && (
        <div className="comment-section">
          {/*  */}
          {commentsData.isAuth && (
            <form action="">
              <input type="text" />
            </form>
          )}
          {/*  */}
          <ul id="comments-list">
            {commentsData.comments.map((cmnt) => {
              return (
                <li key={cmnt.id}>
                  <p>Comment User: {cmnt.cmnt_user.username}</p>
                  <p>Comment content: {cmnt.content}</p>
                  <p>Comment time: {cmnt.createdAt}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
