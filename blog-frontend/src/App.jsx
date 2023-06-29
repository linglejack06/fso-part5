import { useState, useEffect } from 'react'
import blogService from './services/blogService';
import loginService from './services/loginService';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Message from './components/Message';

const App = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  useEffect(() => {
    blogService.getBlogs().then((response) => setBlogs(response));
  }, []);
  useEffect(() => {
    const JSONUser = window.localStorage.getItem('loggedUser');
    if (JSONUser) {
      const userObject = JSON.parse(JSONUser)
      setUser(userObject);
      blogService.setToken(userObject.token);
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
  const addMessage = (message, error) => {
    if (error) {
      setError(true);
    } else {
      setError(false);
    }
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
      setError(false);
    }, 5000)
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login({
        username, password,
      });
      setUser(response);
      window.localStorage.setItem('loggedUser', JSON.stringify(response));
      blogService.setToken(response.token);
      setPassword('');
      setUsername('');
      addMessage(`Successfully logged in as ${response.name}`);
    } catch (error) {
      console.error(error.message);
      addMessage('Invalid Username or password', true);
    }
  }
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
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
      addMessage('Successfully created blog');
    } catch (error) {
      setMessage(error.message);
      setError(true);
      setTimeout(() => {
        setMessage(null)
        setError(false);
      }, 5000)
    }
  }
  return (
    <>
      {( user === null) ? (
        <div className='login'>
          <Message message={message} error={error} />
          <LoginForm username={username} password={password} handleChange={handleChange} handleSubmit={handleLoginSubmit}/>
        </div>
      ) : (
        <div>
          <div>
            {(message == null) ? (
              <h1>Logged In: {user.name}</h1>
              ) : (
                <Message message={message} error={error} />
              )}
            <button onClick={handleLogout}>Logout</button>
          </div>
          <BlogForm user={user} title={title} author={author} url={url} handleChange={handleChange} handleSubmit={handleBlogSubmit} />
          <BlogList blogs={blogs} />
        </div>
      )}
    </>
  )
}

export default App
