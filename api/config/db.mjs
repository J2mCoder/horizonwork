import "dotenv/config"
import { connect } from "mongoose"

export async function connect_db() {
  try {
    await connect(process.env.URL_DB)
      .then(() => console.log("la base de donnée est connecté"))
      .catch((err) => console.log("Erreur survenue :", err))
  } catch (err) {
    console.log("Erreur survenue :", err)
  }
}
