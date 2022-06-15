const path = require("path");
const express = require("express");

const app = express();

app.use(require("cors")()); //permite que o front chame o backend
app.use(express.json()); //pega as informaçoes em json vindas do front em binária e converte para json

const upload = require("multer")(); //pacote responsável por fazer upload de arquivos

app.post("/send", upload.single("anexo"), (req, res, next) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const mensagem = req.body.mensagem;
  const assunto = req.body.assunto;
  const anexo = req.file;

  require("./src/services/mailService.jsx")(
    email,
    nome,
    mensagem,
    assunto,
    anexo
  )
    .then((response) => res.json(response))
    .catch((error) => res.status(500).json(error));
  // res.json({
  //   nome,
  //   email,
  //   mensagem,
  //   anexo,
  // });
}); //rota atendida, função que vai tratar a chamada a rota send

app.use(express.static(path.join(__dirname, "build")));

app.listen(3000, () => {
  console.log("server on");
});
