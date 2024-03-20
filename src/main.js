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
  const { id, title, description, team, goals_scored,  image_base64  } = req.body;
  const result = await createPost(id, title, description, team, goals_scored,  image_base64);
  res.json(result);
});

// Modificar un post por su ID
app.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  const { id, title, description, team, goals_scored, image_base64 } = req.body;
  const result = await updatePost(id, title, description, team, goals_scored, image_base64, postId);
  
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

// Middleware para manejar métodos HTTP no implementados
app.use((req, res, next) => {
  res.status(501).json({ error: 'Method not implemented' });
});

//Validar 
function validateData(req, res, next) {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { id, title, description, team, goals_scored, image_base64 } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'El campo "title" es requerido y debe ser una cadena de caracteres.' });
    }

    next();
  } else {
    next();
  }
}

app.use(validateData);

// Middleware para manejar errores de conexión a la base de datos
app.use((err, req, res, next) => {
  if (err.name === 'DatabaseError') {
    handleDatabaseError(err, res);
  } else {
    next(err);
  }
});

// Middleware para manejar errores internos de la aplicación
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});

