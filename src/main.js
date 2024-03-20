const express = require('express');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('./db.js');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Obtener todos los posts
app.get('/posts', async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

// Obtener un post por su ID
app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  const post = await getPostById(postId);
  
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post no encontrado' });
  }
});

// Crear un nuevo post
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const result = await createPost(title, content);
  res.json(result);
});

// Modificar un post por su ID
app.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  const result = await updatePost(postId, title, content);
  
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Post no encontrado' });
  }
});

// Borrar un post por su ID
app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  const result = await deletePost(postId);
  
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Post no encontrado' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
