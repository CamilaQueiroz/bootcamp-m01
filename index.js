const express = require('express');
const server = express();

const users = ['Camila', 'Natalia', 'Maya'];

server.use(express.json())

server.use((req, res, next) => {
  console.log(`Method: ${req.method} URL: ${req.url}`)
  return next()
})

function checkUsersExists(req, res, next) {
  if(!req.body.name) {
    return res.status(400).json({ error: 'name is required'})
  }
  return next();
}

function checkUsersInArray(req, res, next) {
  const user = users[req.params.index];
  if(!user) {
    return res.status(400).json({ error: 'user does not exists'})
  }
  req.user = user;
  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
})

server.get('/users/:index', checkUsersInArray,(req, res) => {
  return res.json(req.user)
})

server.post('/users', checkUsersExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users)
})

server.put('/users/:index', checkUsersInArray, checkUsersExists,(req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users)
})

server.delete('/users/:index', checkUsersInArray,(req, res) => {
  const { index } = req.params;
  users.splice(index, 1)
  return res.send()
})

server.listen(3000); 