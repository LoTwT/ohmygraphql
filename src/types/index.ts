export type GraphqlQueryResult = {
  create: string
  find: string
  findAll: string
  update: string
  remove: string
}

export type ActionType = "create" | "find" | "update" | "remove" | "findAll"

export type QueryType = "query" | "mutation"

export type QueryOptions = {
  resource: string
  fields: string[]
  args?: Record<string, unknown>
}

export type CreateActionResult = {
  base: string
  input: string
}
export type CreateAction = () => CreateActionResult
