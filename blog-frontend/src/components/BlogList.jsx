import Blog from './Blog';

const BlogList = ({ blogs, addLike, deleteBlog }) => {
  return (
    <div className='blog-list'>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog}/>
        ))}
      </ul>
    </div>
  )
}

export default BlogList;