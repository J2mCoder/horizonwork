import "dotenv/config"
import { Resend } from "resend"
const resendApiKey = process.env.RESEND_API_KEY
const resend = new Resend(resendApiKey)

export async function sendEmail(email, token) {
  const mail = ["jeandedieumbumba2802@gmail.com"]
  if (mail.find(email)) {
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
        h1 {
          color: #2A305D;
        }
        p {
          line-height: 1.6;
          color: #555;
        }
        .button {
          background-color: #2A305D;
          color: white;
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
        <a href="http://localhost:8000/api/auth/verify-email/${token}" class="button">Vérifier mon e-mail</a>
        <p>Une fois votre adresse e-mail vérifiée, vous pourrez accéder à toutes les fonctionnalités de HorizonWork et commencer à gérer vos projets efficacement.</p>
        <p>Si vous avez des questions ou avez besoin d'assistance, n'hésitez pas à nous contacter.</p>
        <footer>
          <p>HorizonWork &copy; ${new Date().getFullYear()}</p>
          <p><a href="http://localhost:8000/home/${token}" style="color: darkblue;">Visitez notre site</a></p>
        </footer>
      </div>
    </body>
  </html>
`
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Bienvenue à Mon Service",
      html: emailTemplate,
    })

    if (error) {
      return console.error({ error })
    }

    if (data) {
      return console.log({ data })
    }
  } else {
    return false
  }
}
