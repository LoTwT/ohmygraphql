import { capitalize } from "./helper"
import {
  ActionType,
  QueryType,
  QueryOptions,
  CreateAction,
  CreateActionResult,
} from "./types"

/**
 * help create a graphql query
 * @param { QueryType } type query or mutation
 * @param { ActionType | CreateAction } action five preset actions or a customized createAction fn
 * @param { QueryOptions<T> } queryOptions
 * @returns { string } a customized graphql query string
 */
export const useGraphqlQuery = <DataType extends Record<string, unknown>>(
  type: QueryType,
  action: ActionType | CreateAction,
  queryOptions: QueryOptions<DataType>,
) => {
  const queryTypeString = type === "query" ? "" : "mutation"

  const { resource, fields, args } = queryOptions

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
  let argsString = ""

  // todo elegantly stringify obj
  for (const key in args) {
    const value = args[key]
    argsString += `,${key}:${typeof value === "number" ? value : `"${value}"`}`
  }

  argsString = argsString.substring(1)

  return `(${actionInput}:{${argsString}})`
}
