import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [campos, setCampos] = useState({
    nome: "",
    email: "",
    mensagem: "",
    assunto: "",
    anexo: "",
  });
  function handleInputChange(event) {
    if (event.target.name === "anexo")
      campos[event.target.name] = event.target.files[0];
    else campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(campos);
    send();
  }

  function send() {
    const formData = new FormData();
    Object.keys(campos).forEach((key) => formData.append(key, campos[key]));
    axios
      .post("/send", formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`, //se for enviar só json pode usar 'application/json' como vamos enviar anexos utiliza esse multipart
        },
      }) //mudar esse /send para a url do servidor do backend, nesse caso, como o back está junto com o front usa o mesmo nome
      .then((response) => alert(JSON.stringify(response.data)));
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="email">E-mail</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Seu e-mail"
        onChange={handleInputChange}
      />

      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        name="nome"
        placeholder="Seu nome"
        onChange={handleInputChange}
      />
      <label htmlFor="assunto">Assunto do e-mail</label>
      <input
        type="text"
        id="assunto"
        name="assunto"
        placeholder="Assunto"
        onChange={handleInputChange}
      />

      <label htmlFor="mensagem">Mensagem</label>
      <textarea
        id="mensagem"
        name="mensagem"
        placeholder="Escreva algo.."
        onChange={handleInputChange}
        className="textArea"
      ></textarea>

      <label htmlFor="anexo">Anexo</label>
      <input type="file" id="anexo" name="anexo" onChange={handleInputChange} />

      <input type="submit" value="Enviar" />
    </form>
  );
}
