import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import BlogList, { loader as blogListLoader } from "./routes/blogs-list";
import BlogPage, {
  loader as blogPageLoader,
  action as blogPageAction,
} from "./routes/blog-page";
import { loader as blogCommentsLoader } from "./routes/blog-comments";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./routes/login";
import Signup from "./routes/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/blogs/",
        element: <BlogList />,
        loader: blogListLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/blogs/:blogID",
        element: <BlogPage />,
        loader: blogPageLoader,
        errorElement: <ErrorPage />,
        action: blogPageAction,
      },
      {
        path: "/blogs/:blogID/comments",
        loader: blogCommentsLoader,
      },
      {
        path: "/accounts/login",
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: "/accounts/signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
