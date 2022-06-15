const mailer = require("nodemailer");

module.exports = (email, nome, mensagem, assunto, anexo) => {
  const smtp = mailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "yourOutlookUser",
      pass: "yourOutlookPassword",
    },
  });
  const mail = {
    from: email,
    to: "diogocardinotuerj@hotmail.com",
    replyTo: email, //quando for responder o e-mail responde diretamente para o e-mail que o usuario cadastrou no input
    subject: assunto,
    // text: `Contato \n E-mail: ${email} \n Nome: ${nome} \n Mensagem: ${mensagem}`,
    html: `<b>Contato</b> <br/> <b>E-mail:</b> ${email} <br/> <b>Nome:</b> ${nome} <br/> <b>Mensagem:</b> ${mensagem}`,
  };

  if (anexo) {
    mail.attachments = [];
    mail.attachments.push({
      filename: anexo.originalname,
      content: anexo.buffer,
    });
  }

  return new Promise((resolve, reject) => {
    smtp
      .sendMail(mail)
      .then((response) => {
        smtp.close();
        return resolve(response);
      })
      .catch((error) => {
        smtp.close();
        return reject(error);
      });
  });
};
