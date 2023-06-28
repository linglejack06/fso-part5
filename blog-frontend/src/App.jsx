import { useState, useEffect } from 'react'
import blogService from './services/blogService';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (e) => {
    switch(e.target.name) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }
  }
  const handleLoginSubmit = (e) => {
    e.preventDefault();
  }
  useEffect(() => {
    blogService.getBlogs().then((response) => setBlogs(response));
  }, []);
  return (
    <>
      <LoginForm username={username} password={password} handleChange={handleChange} handleSubmit={handleLoginSubmit} />
      <BlogList blogs={blogs} />
    </>
  )
}

export default App
