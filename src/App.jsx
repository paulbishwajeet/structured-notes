import NoteEntryForm from './components/NoteEntryForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Structured Notes Portfolio Manager</h1>
      <NoteEntryForm />
    </div>
  );
}

export default App;
