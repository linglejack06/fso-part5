const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <a href={blog.url}>{blog.title} by {blog.author}</a>
    </div>
  )
}

export default Blog;