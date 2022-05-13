import { kebab2Camel } from "./helper"
import { GraphqlQuery, GraphqlMutation } from "./types"

/**
 * help create a graphql query
 * @param { GraphqlQuery<T> | GraphqlMutation<T> } options
 * @returns { string } a customized graphql query string
 */
export const useGraphql = <DataType extends Record<string, unknown>>(
  options: GraphqlQuery<DataType> | GraphqlMutation<DataType>,
) => {
  const { operation, action, fields, args } = options

  const queryTypeString = operation === "query" ? "query" : "mutation"

  const { type: actionType, input: actionInput } = action()

  const actionTypeString = kebab2Camel(actionType)

  const hasArgs = !!(args && Object.keys(args).length)

  const argsString =
    hasArgs && actionInput
      ? createArgsString(args, kebab2Camel(actionInput))
      : ""

  const fieldsString = createFieldsString(fields)

  return `${queryTypeString}{${actionTypeString}${argsString}{${fieldsString}}}`
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
