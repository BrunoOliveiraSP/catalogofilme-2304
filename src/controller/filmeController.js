import { Router } from "express";
import { salvar, listarTodos, buscarPorNome, buscarPorId, alterar, remover, alterarCapa } from "../repository/filmeRepository.js";

import multer from "multer";
const upload = multer({ dest: './storage' })

const endpoints = Router();



endpoints.post('/filme', async (req, resp) => {
  let filme = req.body;

  let r = await salvar(filme);
  resp.send(r);
})



endpoints.get('/filme', async (req, resp) => {
  let r = await listarTodos();
  resp.send(r);
})



endpoints.get('/filme/busca', async (req, resp) => {
  let nome = req.query.nome;
  let r = await buscarPorNome(nome);
  resp.send(r);
})



endpoints.get('/filme/:id', async (req, resp) => {
  let id = req.params.id;
  let r = await buscarPorId(id);

  if (r == null)
    resp.status(404).send();
  else
    resp.send(r);
})





endpoints.put('/filme/:id', async (req, resp) => {
  let id = req.params.id;
  let filme = req.body;

  let r = await alterar(id, filme);
  if (r == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
})



endpoints.delete('/filme/:id', async (req, resp) => {
  let id = req.params.id;

  let r = await remover(id);
  if (r == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
})





endpoints.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
  let id = req.params.id;
  let caminho = req.file.path;

  let r = await alterarCapa(id, caminho);
  if (r == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
})






export default endpoints;