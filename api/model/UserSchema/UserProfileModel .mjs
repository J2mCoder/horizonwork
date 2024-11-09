import { Schema, model } from "mongoose"

const UserProfileModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    about: {
      type: String,
      maxlength: 50,
    },
    experienceDate: {
      type: Date,
    },
    dateOfBirth: {
      type: Date,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    location: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
)

const UserProfile = model("UserProfile", UserProfileModel)
export default UserProfile
