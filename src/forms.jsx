import React from "react";
import { useState } from "react";
import axios from "axios";
import loadingImage from "./images/loading.png";
import "./forms.css";
import Console from "./form.jsx";

export default function Form() {
  const [campos, setCampos] = useState({
    nome: "",
    email: "",
    mensagem: "",
    assunto: "",
    anexo: "",
  });
  const button = document.querySelector(".submitButton");
  function removeLoad() {
    button.innerHTML = "ENVIAR";
  }
  function addLoad() {
    button.innerHTML = "Sandro";
  }
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
    addLoad();
    const formData = new FormData();
    Object.keys(campos).forEach((key) => formData.append(key, campos[key]));
    axios
      .post("/send", formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`, //se for enviar só json pode usar 'application/json' como vamos enviar anexos utiliza esse multipart
        },
      }) //mudar esse /send para a url do servidor do backend, nesse caso, como o back está junto com o front usa o mesmo nome
      .then((response) => alert(JSON.stringify(response.data)))
      .then(() => removeLoad);
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-wrapper">
        <div className="inputs-wrapper">
          <label htmlFor="email">E-mail</label>
          <input
            className="informationInput"
            type="text"
            id="email"
            name="email"
            placeholder="Seu e-mail"
            onChange={handleInputChange}
          />
        </div>

        <div className="inputs-wrapper">
          <label htmlFor="nome">Nome</label>
          <input
            className="informationInput"
            type="text"
            id="nome"
            name="nome"
            placeholder="Seu nome"
            onChange={handleInputChange}
          />
        </div>

        <div className="inputs-wrapper">
          <label htmlFor="assunto">Assunto do e-mail</label>
          <input
            className="informationInput"
            type="text"
            id="assunto"
            name="assunto"
            placeholder="Assunto"
            onChange={handleInputChange}
          />
        </div>

        <div className="inputs-wrapper">
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            className="informationTextArea"
            id="mensagem"
            name="mensagem"
            placeholder="Escreva algo.."
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="inputs-wrapper">
          <label htmlFor="anexo">Anexo</label>
          <label htmlFor="anexo" className="anexoLabel">
            Insira aqui seu anexo
          </label>
          <input
            className="inputAnexo"
            type="file"
            id="anexo"
            name="anexo"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submitButton" onClick={Console}>
          ENVIAR
        </button>
      </div>
    </form>
  );
}
