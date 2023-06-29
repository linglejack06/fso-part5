const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='input-container'>
        <label htmlFor='title'>Title: </label>
        <input value={title} onChange={handleChange} name='title' id='title' />
      </div>
      <div className='input-container'>
        <label htmlFor='author'>Author: </label>
        <input value={author} onChange={handleChange} name='author' id='author' />
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
    </form>
  )
}

export default BlogForm;