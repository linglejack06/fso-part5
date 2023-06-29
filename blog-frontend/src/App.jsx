import { useState, useEffect } from 'react'
import blogService from './services/blogService';
import loginService from './services/loginService';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState((user === null) ? '' : user.name);
  const [url, setUrl] = useState('');
  useEffect(() => {
    blogService.getBlogs().then((response) => setBlogs(response));
  }, []);
  useEffect(() => {
    const JSONUser = window.localStorage.getItem('loggedUser');
    if (JSONUser) {
      const userObject = JSON.parse(JSONUser)
      setUser(userObject);
      loginService.setToken(userObject.token);
    }
  }, [])
  const handleChange = (e) => {
    switch(e.target.name) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'title':
        setTitle(e.target.value);
        break;
      case 'author':
        setAuthor(e.target.value);
        break;
      case 'url':
        setUrl(e.target.value);
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
      window.localStorage.setItem('loggedUser', JSON.stringify(response));
      loginService.setToken(response.token);
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
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    loginService.setToken('');
  }
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const blog = await blogService.addBlog({
        title, author, url,
      });
      setBlogs([...blogs, blog]);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <>
      {( user === null) ? (
        <LoginForm username={username} password={password} handleChange={handleChange} handleSubmit={handleLoginSubmit} errorMessage={errorMessage}/>
      ) : (
        <div>
          <div>
            <h1>Logged In: {user.name}</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <BlogForm title={title} author={author} url={url} handleChange={handleChange} handleSubmit={handleBlogSubmit} />
          <BlogList blogs={blogs} />
        </div>
      )}
    </>
  )
}

export default App
