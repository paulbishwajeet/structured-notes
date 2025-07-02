import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Enable JSON body parsing

app.post('/api/notes', (req, res) => {
  const note = req.body;
  console.log('Received structured note:', note);
  // In a real application, you would save this to a database
  res.status(200).json({ message: 'Note received successfully!', noteId: Date.now() });
});

app.listen(port, () => {
  console.log(`Mock API server listening at http://localhost:${port}`);
});
