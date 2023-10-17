export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Blog Spec</h1>
        {/* This search will be implemented inside /blogs/ */}
        {/* <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div> */}
        <nav>
          <ul>
            <li>
              <a href={`/blogs/`}>Blogs</a>
            </li>
            <li>
              <a href={`/login/`}>Login</a>
            </li>
            <li>
              <a href={`/signup/`}>Signup</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
