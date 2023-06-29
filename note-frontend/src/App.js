import { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();
  useEffect(() => {
    noteService.getAll()
      .then((initialData) => setNotes(initialData));
  }, []) //empty array causes this effect to only be ran along with first render
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if(loggedUserJSON) {
      const userObj = JSON.parse(loggedUserJSON);
      setUser(userObj);
      noteService.setToken(userObj.token);
    }
  }, [])
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const addNote = (noteObject) => {
    noteService.create(noteObject)
      .then((data) => {
        setNotes(notes.concat(data));
      });
    noteFormRef.current.toggleVisibility();
  }
  const handleLoginChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService.login({
        username, password,
      });
      setUser(res);
      window.localStorage.setItem('loggedUser', JSON.stringify(res))
      noteService.setToken(res.token);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Invalid username or password');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000)
    }
  }
  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id)
    const changedNote = {
      ...note,
      important: !note.important
    }
    noteService.update(id, changedNote)
      .then((data) => setNotes(notes.map(note => note.id !== id ? note : data)))
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter((note) => note.id !== id));
      })
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      { (user === null) ? (
        <Togglable buttonLabel='Login'>
          <Login username={username} password={password} handleChange={handleLoginChange} handleSubmit={handleLoginSubmit} />
        </Togglable>
      ) : (
        <div>
          <p>Logged In: {user.name}</p>
          <Togglable buttonLabel='New Note' ref={noteFormRef}>
            <NoteForm createNote={addNote}/>
          </Togglable>
        </div>
      )}
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note note={note} toggleImportance={() => toggleImportanceOf(note.id)} key={note.id} />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App;
