import { BaseObject } from "./types"

export const isEmptyObj = (obj: BaseObject) => Object.keys(obj).length === 0

export const removeInitial = (str: string, initial: string) =>
  str[0] === initial ? str.substring(1) : str
