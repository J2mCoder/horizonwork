import { Schema, model } from "mongoose"

const taskSchema = new Schema({
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  projet: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  assigneA: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  priorite: {
    type: String,
    enum: ["basse", "moyenne", "élevée", "critique"],
    default: "moyenne",
  },
  statut: {
    type: String,
    enum: ["non commencée", "en cours", "terminée", "bloquée"],
    default: "non commencée",
  },
  dateDebut: {
    type: Date,
    required: false,
  },
  dateFin: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Task = model("Task", taskSchema)
export default Task
