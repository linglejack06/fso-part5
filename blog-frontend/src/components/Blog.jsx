const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <p>{blog.title} by {blog.author}</p>
    </div>
  )
}

export default Blog;