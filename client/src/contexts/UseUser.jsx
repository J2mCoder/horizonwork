import { atom } from "recoil"

export const userAtom = atom({
  key: "userAtom",
  default: null,
})

export const tokenData = atom({
  key: "tokenData",
  default: null,
})
