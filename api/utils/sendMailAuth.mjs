import "dotenv/config"
import nodemailer from "nodemailer"

// Fonction pour envoyer l'e-mail// Fonction pour envoyer l'e-mail
export const sendMail = async (email, verificationCode) => {
  // Création du template pour l'envoi d'e-mail avec un code de vérification
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
        .code-box {
          background-color: #2A305D;
          color: #fff;
          font-size: 20px;
          padding: 10px;
          text-align: center;
          border-radius: 5px;
          margin: 20px 0;
          letter-spacing: 2px;
        }
        footer {
          margin-top: 20px;
          text-align: center;
          color: #888;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bienvenue à HorizonWork!</h1>
        <p>Merci de vous être inscrit à notre plateforme. Veuillez utiliser le code de confirmation ci-dessous pour vérifier votre adresse e-mail :</p>
        <div class="code-box">${verificationCode}</div>
        <p>Si vous avez des questions, notre équipe est là pour vous aider.</p>
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
    subject: "Code de confirmation - HorizonWork",
    text: `Votre code de confirmation est : ${verificationCode}`,
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
