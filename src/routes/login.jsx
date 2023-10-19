// now login can have 2 cases
// 1. user is already logged in
// 2. user can log in
//      i. if login credentials are wrong --> login unsuccessfull
//          -> here we may repopulate the form or maybe not :)
//      ii. if login is successfull

import { useFetcher, useLoaderData } from "react-router-dom";

export async function loader() {
  // what does loader check?
  // loader checks if the user is already logged in or not?
  try {
    const isLoggedInResponse = await fetch(
      "http://localhost:3000/users/isLoggedIn",
      {
        credentials: "include",
      }
    );
    // here we pass in to include credentials
    // so the server will always pass back a sid, which will be stored
    // by our browser
    const isLoggedIn = await isLoggedInResponse.json();
    // console.log(isLoggedIn);
    return {
      status: isLoggedIn.status,
    };
  } catch (err) {
    // throwing error from catch is not sensible
    throw new Error("Logging in service not available :(");
  }
}

export async function action({ request, params }) {
  // this will handle the action of form submit
  let formData = await request.formData();
  // here we can add checks too, to check fo valid data being entered
  const usernameEntry = formData.get("username");
  const passwordEntry = formData.get("password");
  const loginAttemptResponse = await fetch(
    "http://localhost:3000/users/login",
    {
      credentials: "include",
      method: "post",
      mode: "cors",
      body: JSON.stringify({
        username: usernameEntry, // here both these fields
        password: passwordEntry, // need to be validated
      }),
      headers: {
        "Content-Type": "application/json", // Adjust content type as needed
      },
    }
  );
  const loginAttempt = await loginAttemptResponse.json();
  console.log(loginAttempt);
  console.log(formData.get("username"));
  return loginAttempt;
}

export default function Login() {
  const loginStatus = useLoaderData();
  const fetcher = useFetcher();
  // console.log(loginStatus);
  console.log(fetcher);
  console.log(fetcher.data);
  return (
    <div id="login-page">
      {fetcher.data && fetcher.data.msg}
      {loginStatus && !loginStatus.status ? (
        <fetcher.Form method="post">
          <input
            type="text"
            name="username"
            id="username"
            minLength={3}
            maxLength={30}
            required={true}
          />
          <input
            type="password"
            name="password"
            id="password"
            minLength={5}
            maxLength={16}
            required={true}
          />
          <button type="submit">Login</button>
        </fetcher.Form>
      ) : (
        <p>You are currently logged in!</p>
      )}
    </div>
  );
}
