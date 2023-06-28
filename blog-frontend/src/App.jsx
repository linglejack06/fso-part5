import { useState, useEffect } from 'react'
import blogService from './services/blogService';
import loginService from './services/loginService';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
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
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login({
        username, password,
      });
      setUser(response);
      setPassword('');
      setUsername('');
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Invalid Password or username');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }
  useEffect(() => {
    blogService.getBlogs().then((response) => setBlogs(response));
  }, []);
  return (
    <>
      <LoginForm username={username} password={password} handleChange={handleChange} handleSubmit={handleLoginSubmit} errorMessage={errorMessage}/>
      <BlogList blogs={blogs} />
    </>
  )
}

export default App
