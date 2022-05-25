import { kebab2Camel } from "./helper"
import { GqlQuery, GqlMutation, GqlFields, BaseObject } from "./types"

export const useGraphql = <T>(options: GqlQuery<T> | GqlMutation<T>) => {
  const { operation, params } = options

  let actionString = ""

  if (Array.isArray(params)) {
    for (let i = 0; i < params.length; i++) {
      const { action, fields, args } = params[i]
      actionString += createActionString(action, fields, args)
    }
  } else {
    const { action, fields, args } = params
    actionString = createActionString(action, fields, args)
  }

  return `${operation}{${actionString}}`
}

export const createActionString = (
  action: { type: string; input?: string },
  fields: GqlFields,
  args?: BaseObject,
) => {
  const { type: actionType, input: actionInput } = action

  const actionTypeString = kebab2Camel(actionType)

  const hasArgs = !!(args && Object.keys(args).length)

  const argsString =
    hasArgs && actionInput
      ? createArgsString(args, kebab2Camel(actionInput))
      : ""

  const fieldsString = createFieldsString(fields)

  return `${actionTypeString}${argsString}{${fieldsString}}`
}

export const createFieldsString = (fields: GqlFields) => {
  let ret = ""

  for (let i = 0; i < fields.length; i++) {
    const f = fields[i]

    if (typeof f === "string") ret += `,${f}`
    else ret += `,${gqlStringify(f)}`
  }

  return ret === "" ? ret : ret.substring(1)
}

export const createArgsString = (args: BaseObject, actionInput: string) => {
  const argsString = gqlStringify(args, "")
  return `(${actionInput}:{${argsString}})`
}

export const gqlStringify = (args: BaseObject, s = "") => {
  for (const key in args) {
    const value = args[key]

    if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length === 0) s += `,${key}:{}`
      else s += `,${key}:{${gqlStringify(value as BaseObject)}}`
    } else if (typeof value === "string") {
      s += `,${key}:"${value}"`
    } else {
      s += `,${key}:${value}`
    }
  }

  return s[0] === "," ? s.substring(1) : s
}
