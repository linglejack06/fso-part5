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
  return (
    <>
      {( user === null) ? (
        <LoginForm username={username} password={password} handleChange={handleChange} handleSubmit={handleLoginSubmit} errorMessage={errorMessage}/>
      ) : (
        <div>
          <h1>Logged In: {user.name}</h1>
          <BlogList blogs={blogs} />
        </div>
      )}
    </>
  )
}

export default App
