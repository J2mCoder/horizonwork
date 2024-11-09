import { Schema, model } from "mongoose"

const SocialLinkModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
)

const SocialLink = model("SocialLink", SocialLinkModel)
export default SocialLink
