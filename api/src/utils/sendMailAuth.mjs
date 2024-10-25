import "dotenv/config"
import nodemailer from "nodemailer"

// Fonction pour envoyer l'e-mail
export const sendMail = async (token, email) => {
  // Création du template pour l'envoi d'e-mail
  const emailTemplate = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4fb;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        a {
          text-decoration: none;
          color: #fff;
        }
        h1 {
          color: #2A305D;
        }
        p {
          line-height: 1.6;
          color: #555;
        }
        .button {
          background-color: #2A305D;
          color: #fff;
          padding: 10px 15px;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
        }
        footer {
          margin-top: 20px;
          text-align: center;
          color: #f4f4fb;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bienvenue à HorizonWork!</h1>
        <p>Merci de vous être inscrit à notre plateforme de gestion de projet. Nous sommes ravis de vous avoir avec nous.</p>
        <p>Pour commencer à utiliser notre service, veuillez vérifier votre adresse e-mail en cliquant sur le bouton ci-dessous :</p>
        <a href="http://localhost:5173/verify-email/${token}" class="button">Vérifier mon e-mail</a>
        <p>Une fois votre adresse e-mail vérifiée, vous pourrez accéder à toutes les fonctionnalités de HorizonWork et commencer à gérer vos projets efficacement.</p>
        <p>Si vous avez des questions ou avez besoin d'assistance, n'hésitez pas à nous contacter.</p>
        <footer>
          <p>© ${new Date().getFullYear()} Tous droits réservés.</p>
          <p>HorizonWork by Horizon Platforms</p>
        </footer>
      </div>
    </body>
  </html>
`
  // Crée un transporteur Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jeandedieumbumba2802@gmail.com",
      pass: process.env.PASS_KEY_MAIL,
    },
  })

  // Configure les options de l'e-mail
  const mailOptions = {
    from: "jeandedieumbumba2802@gmail.com",
    to: email,
    subject: "Bienvenue à Mon Service",
    text: "Merci de votre inscription à Mon Service",
    html: emailTemplate,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Adresse mail envoyée", info)
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :")
    console.error("Message:", error.message)
    console.error("Code:", error.code)
    console.error("Response:", error.response)
    console.error("Stack:", error.stack)
  }
}

console.log("PASS_KEY_MAIL:", process.env.PASS_KEY_MAIL, process.env.port)
