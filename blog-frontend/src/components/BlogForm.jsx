const BlogForm = ({ user, title, author, url, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='input-container'>
        <label htmlFor='title'>Title: </label>
        <input value={title} onChange={handleChange} name='title' id='title' />
      </div>
      <div className='input-container'>
        <label htmlFor='author'>Author: </label>
        <input value={author} placeholder={user.name} onChange={handleChange} name='author' id='author' />
      </div>
      <div className='input-container'>
        <label htmlFor='url'>Web Address: </label>
        <input type='url'
          pattern='https://.*'
          placeholder='https://example.org' 
          value={url} 
          onChange={handleChange} 
          name='url' 
          id='url' />
      </div>
      <button type='submit'>Add Blog</button>
    </form>
  )
}

export default BlogForm;