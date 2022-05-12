import { capitalize } from "./helper"
import {
  ActionType,
  CreateActionResult,
  GraphqlQuery,
  GraphqlMutation,
} from "./types"

/**
 * help create a graphql query
 * @param { GraphqlQuery<T> | GraphqlMutation<T> } options
 * @returns { string } a customized graphql query string
 */
export const useGraphqlQuery = <DataType extends Record<string, unknown>>(
  options: GraphqlQuery<DataType> | GraphqlMutation<DataType>,
) => {
  const { type, action, resource, fields, args } = options

  const queryTypeString = type === "query" ? "query" : "mutation"

  const { base: actionString, input: actionInput } =
    typeof action === "function"
      ? action()
      : createDefaultAction(action, resource)

  const hasArgs = !!(args && Object.keys(args).length)

  const argsString = hasArgs ? createArgsString(args, actionInput) : ""

  const fieldsString = createFieldsString(fields)

  return `${queryTypeString}{${actionString}${argsString}{${fieldsString}}}`
}

export const createDefaultAction = (
  action: ActionType,
  resource: string,
): CreateActionResult => {
  const isFindSome = action === "findSome"
  const actionString = `${isFindSome ? "find" : action}${capitalize(resource)}${
    isFindSome ? "s" : ""
  }`
  return {
    base: actionString,
    input: `${actionString}Input`,
  }
}

export const createFieldsString = (fields: string[]) => fields.join(" ")

export const createArgsString = (
  args: Record<string, unknown>,
  actionInput: string,
) => {
  const argsString = gqlStringify(args, "")
  return `(${actionInput}:{${argsString}})`
}

export const gqlStringify = (args: Record<string, unknown>, s = "") => {
  for (const key in args) {
    const value = args[key]

    if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length === 0) s += `,${key}:{}`
      else s += `,${key}:{${gqlStringify(value as Record<string, unknown>)}}`
    } else if (typeof value === "string") {
      s += `,${key}:"${value}"`
    } else {
      s += `,${key}:${value}`
    }
  }

  return s[0] === "," ? s.substring(1) : s
}
