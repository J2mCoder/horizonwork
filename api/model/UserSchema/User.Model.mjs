import { Schema, model } from "mongoose"

const UserModel = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    googleAuth: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "default.png",
    },
    confirmationCode: String,
  },
  { timestamps: true, versionKey: false }
)

const User = model("User", UserModel)
export default User
