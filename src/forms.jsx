import React from "react";
import { useState } from "react";
import axios from "axios";
// import loadingImage from "./images/loading.png";
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
  function verifyInputs(event) {
    const emailTest = /^\S+@\S+\.\S+$/;
    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    // NOME
    if (event.target.name === "nome" && event.target.value !== "") {
      console.log("NomePreenchido");
      nome.classList.remove("invalid");
      nome.nextElementSibling.classList.remove("invalid");
    }
    if (event.target.name === "nome" && event.target.value === "") {
      console.log("NomeVazio");
      nome.classList.add("invalid");
      nome.nextElementSibling.classList.add("invalid");
    }
    // EMAIL
    if (
      event.target.name === "email" &&
      event.target.value !== "" &&
      !emailTest.test(event.target.value)
    ) {
      console.log("Email Incorreto");
      email.classList.add("invalid");
      email.nextElementSibling.innerHTML = "Formato Inválido";
      email.nextElementSibling.classList.add("invalid");
    }
    if (event.target.name === "email" && event.target.value === "") {
      console.log("Email Vazio");
      email.classList.add("invalid");
      email.nextElementSibling.innerHTML = "Campo Obrigatório";
      email.nextElementSibling.classList.add("invalid");
    }
    if (
      event.target.name === "email" &&
      event.target.value !== "" &&
      emailTest.test(event.target.value)
    ) {
      console.log("Email Correto");
      email.classList.remove("invalid");
      email.nextElementSibling.classList.remove("invalid");
    }
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
            onBlur={verifyInputs}
          />
          <span className="invalidText">Campo Obrigatóio</span>
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
          <span className="invalidText">Campo Obrigatóio</span>
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
