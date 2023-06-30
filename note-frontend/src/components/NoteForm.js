import { useState } from 'react';

function NoteForm({ createNote }) {
  const [note, setNote] = useState('');
  const addNote = (e) => {
    e.preventDefault();
    createNote({
      content: note,
      important: true,
    });
    setNote('');
  };
  return (
    <form onSubmit={addNote}>
      <input value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="submit">save</button>
    </form>
  );
}

export default NoteForm;
