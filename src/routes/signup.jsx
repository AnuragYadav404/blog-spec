import { redirect, useFetcher, useLoaderData } from "react-router-dom";

export async function action({ request, params }) {
  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData);
  // here the formEntries need to be validated too
  const signupResponse = await fetch("http://localhost:3000/users/signup", {
    credentials: "include",
    method: "post",
    mode: "cors",
    body: JSON.stringify({
      username: formEntries["username"], // here both these fields
      password: formEntries["password"], // need to be validated
      description: formEntries["description"],
      name: formEntries["name"],
    }),
    headers: {
      "Content-Type": "application/json", // Adjust content type as needed
    },
  });
  const signupOp = await signupResponse.json();
  if (signupOp.statusCode == 200) {
    // here the signup was successfull
    // now we can also login the user via same credentials
    const loginAttemptResponse = await fetch(
      "http://localhost:3000/users/login",
      {
        credentials: "include",
        method: "post",
        mode: "cors",
        body: JSON.stringify({
          username: formEntries["username"], // here both these fields
          password: formEntries["password"], // need to be validated
        }),
        headers: {
          "Content-Type": "application/json", // Adjust content type as needed
        },
      }
    );
    const loginAttempt = await loginAttemptResponse.json();
    if (loginAttempt.statusCode == 200) {
      return redirect("/blogs");
    } else {
      return redirect("/login");
    }
  } else {
    // the formData failed validation checks
    return signupOp;
  }
  // console.log(signupResponse);
  // console.log(signupOp);
  // return null;
}

export default function Signup() {
  // here we first gotta check if the user
  // is already logged in or not
  const loginStatus = useLoaderData();
  const fetcher = useFetcher();
  console.log(fetcher.data);
  return (
    <div id="signup-page">
      <h1>Signup Page</h1>
      {loginStatus && !loginStatus.status ? (
        <fetcher.Form method="post">
          <input
            type="text"
            name="username"
            id="username"
            minLength={3}
            maxLength={30}
            required={true}
            placeholder="username"
          />
          <input
            type="password"
            name="password"
            id="password"
            // minLength={5}
            maxLength={16}
            required={true}
            placeholder="password"
          />
          <input
            type="text"
            name="name"
            id="name"
            minLength={2}
            maxLength={100}
            required={true}
            placeholder="Enter your name"
          />
          <textarea
            name="description"
            id="description"
            cols="50"
            rows="10"
            maxLength={1000}
            placeholder="Description"
          ></textarea>
          <button type="submit">Sign up</button>
        </fetcher.Form>
      ) : (
        <i>You are currently logged in!</i>
      )}
      {fetcher.data &&
        (fetcher.data.statusCode == 400 || fetcher.data.statusCode == 401) && (
          <div className="error-list">
            <h3>{fetcher.data.msg}</h3>
            <ul>
              {fetcher.data.errors &&
                fetcher.data.errors.map((err) => {
                  return <li key={err.msg}>{err.msg}</li>;
                })}
            </ul>
          </div>
        )}
      {/* <ul>
        {fetcher.data.}
      </ul> */}
    </div>
  );
}
