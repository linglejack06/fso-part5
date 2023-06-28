import { useState, useEffect } from 'react'
import blogService from './services/blogService';
import BlogList from './components/BlogList';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    blogService.getBlogs().then((response) => setBlogs(response));
  }, []);
  return (
    <>
      <BlogList blogs={blogs} />
    </>
  )
}

export default App
