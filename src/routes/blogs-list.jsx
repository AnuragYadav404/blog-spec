// this returns a component containing list of all the blogs

import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const blogListResponse = await fetch("http://localhost:3000/articles/");
    if (blogListResponse.ok) {
      const blogListJson = await blogListResponse.json();
      // console.log(blogListJson.articles);
      return {
        articles: blogListJson.articles,
      };
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default function BlogList() {
  const blogList = useLoaderData();

  // here we have 2 possibilities
  // blogLists exists
  // blogLists does not exist
  return (
    <div id="blog-list">
      {blogList ? (
        blogList.articles.length > 1 ? (
          <ul>
            {blogList.articles.map((art) => {
              return (
                <li key={art.id}>
                  <Link to={`/blogs/${art.id}`}>
                    <Article article={art} />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <h2>No blogs published yet!</h2>
        )
      ) : (
        <h2>No blogs found.</h2>
      )}
    </div>
  );
}

function Article({ article }) {
  return (
    <div id="article">
      <p>Title: {article.title}</p>
      <p>Author: {article.author.username}</p>
      <p>Created At: {article.createdAt_formatted}</p>
    </div>
  );
}
