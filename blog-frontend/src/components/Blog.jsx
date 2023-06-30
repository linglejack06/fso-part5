import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, addLike, deleteBlog, isMadeByUser }) => {
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
          { isMadeByUser ? (
              <button onClick={() => deleteBlog(blog.id)}>
                Delete Blog
              </button>
            ) : ( null )
          }
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
Blog.PropTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  isMadeByUser: PropTypes.bool.isRequired,
}

export default Blog;