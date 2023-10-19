import { Form, useFetcher, useLoaderData } from "react-router-dom";
import BlogComments from "./blog-comments";
import BlogContent from "./blog-content";

export async function loader({ params }) {
  try {
    const blogFetchResponse = await fetch(
      `http://localhost:3000/articles/${params.blogID}`
    );
    if (blogFetchResponse.ok) {
      const blogArticle = await blogFetchResponse.json();
      if (blogArticle.articleStatus == 200) {
        return blogArticle.article;
      }
      return null;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function action({ request, params }) {
  console.log("action is called");

  let formData = await request.formData();
  console.log("form data is: ", formData);
  // console.log(formData.get("suar"));
  //   const newContact = updateContact(params.contactId, {
  //     favorite: formData.get("favorite") === "true",
  //   });
  //   return newContact;
  return null;
}

export default function BlogPage() {
  const blog = useLoaderData();
  return (
    <div id="blog-page">
      {blog ? (
        <div className="blog-container">
          <BlogContent title={blog.title} content={blog.content} />
          <BlogComments blogID={blog.id} />
        </div>
      ) : (
        <h1>Blog not found.</h1>
      )}
    </div>
  );
}
