import { capitalize } from "./helper"
import {
  GraphqlQueryResult,
  ActionType,
  QueryType,
  QueryOptions,
  CreateAction,
  CreateActionResult,
} from "./types"

export const useGraphqlQuery = (
  resource: string,
  fields: string[],
  args?: Record<string, unknown>,
): GraphqlQueryResult => {
  return {
    create: createQuery("mutation", "create", { resource, fields, args }),
    find: createQuery("query", "find", { resource, fields, args }),
    findAll: createQuery("query", "findAll", { resource, fields, args }),
    update: createQuery("mutation", "update", { resource, fields, args }),
    remove: createQuery("mutation", "remove", { resource, fields, args }),
  }
}

export const createQuery = (
  type: QueryType,
  action: ActionType | CreateAction,
  queryOptions: QueryOptions,
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
  action: string,
  resource: string,
): CreateActionResult => {
  const isFindAll = action === "findAll"
  const actionString = `${isFindAll ? "find" : action}${capitalize(resource)}${
    isFindAll ? "s" : ""
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
