import { useFetcher, useLoaderData } from "react-router-dom";

export async function action({ request, params }) {
  // this function is basically submitted,
  // this actions just logsout the current user
  const logoutResponseJson = await fetch("http://localhost:3000/users/logout", {
    method: "post",
    credentials: "include",
    mode: "cors",
  });
  const logoutResponse = await logoutResponseJson.json();
  return logoutResponse;
}

export default function LogOut() {
  const fetcher = useFetcher();
  const loginStatus = useLoaderData();
  console.log(loginStatus);
  return (
    <div className="logout-page">
      <h1>Logout Page</h1>
      {fetcher.data && <p>{fetcher.data.msg}</p>}
      {!fetcher.data && loginStatus && loginStatus.status ? (
        // if the user is logged in
        // render a button/form to logout
        <fetcher.Form method="post">
          <i>Are you sure you want to logout?</i>
          <button type="submit">Logout</button>
        </fetcher.Form>
      ) : (
        // if the user is not logged in
        !fetcher.data && <p>You must be logged in first to logout</p>
      )}
    </div>
  );
}
