import { useState } from 'react';

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [full, setFull] = useState(false);
  const toggleFull = () => {
    setFull(!full);
  }
  if (full) {
    return (
      <div className='wrapper'>
        <div className='blog-container large'>
          <p>{blog.title} by {blog.author}</p>
          <a href={blog.url}>{blog.url}</a>
          <button onClick={() => addLike(blog.id)}>
            Likes {blog.likes}
          </button>
          <button onClick={() => deleteBlog(blog.id)}>
            Delete Blog
          </button>
        </div>
        <button onClick={toggleFull}>Close</button>
      </div>
    )
  }
  return (
    <div className='blog-container small'>
      <p>{blog.title} by {blog.author}</p>
      <button onClick={toggleFull}>Expand</button>
    </div>
  )
}

export default Blog;