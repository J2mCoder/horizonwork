import { atom } from "recoil"

export const userAtom = atom({
  key: "userAtom",
  default: null,
})

export const tokenData = atom({
  key: "tokenData",
  default: null,
})

export const memberAtom = atom({
  key: "memberAtom",
  default: null,
})

export const LoaderAtom = atom({
  key: "loaderAtom",
  default: true,
})

export const profileAtom = atom({
  key: "profileAtom",
  default: null,
})

export const flagsAtoms = atom({
  key: "flagsAtoms",
  default: null,
})
