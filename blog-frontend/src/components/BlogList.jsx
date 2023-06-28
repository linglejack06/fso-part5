import Blog from './Blog';

const BlogList = ({ blogs }) => {
  return (
    <div className='blog-list'>
      <h2>Blogs</h2>
      <uL>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </uL>
    </div>
  )
}

export default BlogList;