import { Schema, model } from "mongoose"

const SkillModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    flag: {
      type: Schema.Types.ObjectId,
      ref: "Flag",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
    },
  },
  { timestamps: true, versionKey: false }
)

const Skill = model("Skill", SkillModel)
export default Skill
