import Blog from './Blog';

const BlogList = ({ blogs, addLike }) => {
  return (
    <div className='blog-list'>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} addLike={addLike}/>
        ))}
      </ul>
    </div>
  )
}

export default BlogList;