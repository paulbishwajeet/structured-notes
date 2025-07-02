import React, { useState, useEffect } from 'react';
import NoteEntryForm from './components/NoteEntryForm';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // The GET endpoint needs to be created in the backend
        const response = await fetch('https://mpcdsrza58.execute-api.us-east-1.amazonaws.com/Prod/notes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Could not fetch notes: ", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Structured Notes Portfolio Manager</h1>
      <NotesList notes={notes} />
      <NoteEntryForm setNotes={setNotes} />
    </div>
  );
}

export default App;

