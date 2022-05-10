export type GraphqlQueryResult = Record<ActionType, string>

export type ActionType = "create" | "find" | "update" | "remove" | "findSome"

export type QueryType = "query" | "mutation"

export type QueryOptions<T extends Record<string, unknown>> = {
  resource: string
  fields: (keyof T & string)[] | string[]
  args?: Partial<T>
}

export type CreateActionResult = {
  base: string
  input: string
}
export type CreateAction = () => CreateActionResult
