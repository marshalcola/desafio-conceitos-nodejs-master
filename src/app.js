const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const { uuidv4, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  // Declara
  const { title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0,
  };

  //adicionar repositório na lista dos que já existem
  repositories.push(repository);
  return response.json(repository);

});

//Rota editar
app.put("/repositories/:id", (request, response) => {
  
  const { title, url, techs} = request.body;

  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id == id);

  if ( findRepositoryIndex == -1) {
    return response.status(400).json ({error: 'Repository does not exists.'})
  }
/*
  repositories[findRepositoryIndex] = {
    id,
    title,
    url,
    techs,
  };*/

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryIndex].likes,
    };

    repositories[findRepositoryIndex] = repository

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (findRepositoryIndex >= 0) {
    repositories.splice(findRepositoryIndex, 1);
  } else {
    return response.status(400).json({ error: 'Repository does not exists.'})

  }
  
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  //buscar ID da requisição
  const {id} = request.params;
  //Buscar o repositório 
  const findRepositoryIndex = repositories.findIndex(repository => repository.id == id);
  
  // se não existir retornar erro
  if (findRepositoryIndex == -1) {
  //  se ele existir
  return response.status(400).json({ error: 'I cannot give a like because it does not exist.'})
  }

  

  repositories[findRepositoryIndex].likes ++;  
  

//retornar o repositorios atualizado
return response.json(repositories[findRepositoryIndex]);

});

module.exports = app;
