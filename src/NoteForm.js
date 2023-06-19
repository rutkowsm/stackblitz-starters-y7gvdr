import React, { useState } from 'react';

function useId() {
  const [id, setId] = useState(0);

  const generateId = () => {
    setId((prevId) => prevId + 1);
    return id;
  };

  return generateId;
}

function NoteForm() {
  const generateId = useId();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || content.trim() === '') {
      alert('Wszystkie pola muszą być wypełnione!');
      return;
    }

    if (title.length > 100 || content.length > 500) {
      alert('Tytuł nie może przekraczać 100 znaków, a treść 500 znaków!');
      return;
    }

    const newNote = {
      id: generateId(),
      title,
      content,
    };

    setNotes([...notes, newNote]);
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Tytuł:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div>
          <label htmlFor="content">Treść:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>

        <button type="submit">Dodaj notatkę</button>
      </form>

      <div>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

function NoteCard({ note }) {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}

export default NoteForm;
