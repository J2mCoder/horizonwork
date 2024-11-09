import { model, Schema } from "mongoose"

const FlagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Flags = model("Flags", FlagSchema)
export default Flags
