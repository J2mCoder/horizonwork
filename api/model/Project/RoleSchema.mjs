import { Schema, model } from "mongoose"

const roleSchema = new Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  permissions: [
    {
      type: Array,
      enum: [
        "ajouter_projet",
        "modifier_projet",
        "supprimer_projet",
        "ajouter_tache",
        "modifier_tache",
        "supprimer_tache",
      ],
      required: false,
    },
  ],
})

const Role = model("Role", roleSchema)
export default Role
