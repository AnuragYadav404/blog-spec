export default function BlogContent({ title, content }) {
  return (
    <div id="blog-content">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}
