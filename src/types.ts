export type QueryType = "find" | "findSome"

export type MutationType = "create" | "update" | "remove"

export type ActionType = QueryType | MutationType

export type CreateActionResult = {
  base: string
  input: string
}

export type CreateAction = () => CreateActionResult

export type QueryOptions<T extends Record<string, unknown>> = {
  resource: string
  fields: (keyof T & string)[] | string[]
  args?: Partial<T>
}

export type GraphqlQuery<T extends Record<string, unknown>> = {
  type: "query"
  action: QueryType | CreateAction
} & QueryOptions<T>

export type GraphqlMutation<T extends Record<string, unknown>> = {
  type: "mutation"
  action: MutationType | CreateAction
} & QueryOptions<T>
