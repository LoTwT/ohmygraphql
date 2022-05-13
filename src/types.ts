export type GqlQueryActionOptions = {
  type: string
  input?: string
}

export type GqlMutationActionOptions = {
  type: string
  input: string
}

export type GqlActionOptions<O extends "query" | "mutation"> = O extends "query"
  ? GqlQueryActionOptions
  : GqlMutationActionOptions

// export type CreateAction<O extends "query" | "mutation"> =
//   () => GqlActionOptions<O>

export type DataType = Record<string, unknown>

export type GqlParams<T extends DataType, O extends "query" | "mutation"> = {
  action: GqlActionOptions<O>
  fields: (keyof T & string)[] | string[]
  args?: Partial<T>
}

export type GraphqlQuery<T extends DataType> = {
  operation: "query"
  params: GqlParams<T, "query">
}

export type GraphqlMutation<T extends DataType> = {
  operation: "mutation"
  params: Required<GqlParams<T, "mutation">>
}
