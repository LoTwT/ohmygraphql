import { capitalize } from "./helper"

export const useGraphqlQuery = (
  resource: string,
  fields: string[],
  args?: Record<string, unknown>,
) => {
  // fields
  const fieldsString = `${fields.join(" ")}`

  let argsString = ""
  if (args && Object.keys(args)) {
    for (const key in args) {
      argsString += `,${key}:${args[key]}`
      argsString = argsString.substring(1)
    }
  }

  return {
    create: presetQuery.create(resource, fieldsString, argsString),
    find: presetQuery.find(resource, fieldsString, argsString),
    findAll: presetQuery.findAll(resource, fieldsString, argsString),
    update: presetQuery.update(resource, fieldsString, argsString),
    remove: presetQuery.remove(resource, fieldsString, argsString),
  } as GraphqlQueryResult
}

const presetQuery: Record<ActionType, any> = {
  create: (resource: string, fieldsString: string, argsString: string) => {
    const actionFnName = `create${capitalize(resource)}`
    return `mutation{${actionFnName}(${actionFnName}Input:{${argsString}}){${fieldsString}}}`
  },
  find: (resource: string, fieldsString: string, argsString: string) => {
    const actionFnName = `find${capitalize(resource)}`
    return `{${actionFnName}(${actionFnName}Input:{${argsString}}){${fieldsString}}}`
  },
  findAll: (resource: string, fieldsString: string, argsString: string) => {
    const actionFnName = `find${capitalize(resource)}s`
    return `{${actionFnName}(${actionFnName}Input:{${argsString}}){${fieldsString}}}`
  },
  update: (resource: string, fieldsString: string, argsString: string) => {
    const actionFnName = `update${capitalize(resource)}`
    return `mutation{${actionFnName}(${actionFnName}Input:{${argsString}}){${fieldsString}}}`
  },
  remove: (resource: string, fieldsString: string, argsString: string) => {
    const actionFnName = `remove${capitalize(resource)}`
    return `mutation{${actionFnName}(${actionFnName}Input:{${argsString}}){${fieldsString}}}`
  },
}

type ActionType = "create" | "find" | "update" | "remove" | "findAll"

type GraphqlQueryResult = {
  create: string
  find: string
  findAll: string
  update: string
  remove: string
}
