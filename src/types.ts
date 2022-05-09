export type GraphqlQueryResult = Record<ActionType, string>

export type ActionType = "create" | "find" | "update" | "remove" | "findSome"

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
