export type GqlActionOptions = {
  type: string
  input?: string
}

export type OperationType = "query" | "mutation"

export type GqlParams<T, O extends OperationType> = {
  action: O extends "query" ? GqlActionOptions : Required<GqlActionOptions>
  fields: (keyof T & string)[] | string[]
  args?: Partial<T>
}

export type GqlQuery<T> = {
  operation: "query"
  params: isTuple<T> extends true
    ? GqlMultiParams<T, "query">
    : GqlParams<T, "query">
}

export type GqlMutation<T> = {
  operation: "mutation"
  params: isTuple<T> extends true
    ? GqlMultiParams<T, "mutation">
    : Required<GqlParams<T, "mutation">>
}

export type GqlMultiParams<
  T,
  O extends OperationType,
  R extends unknown[] = [],
> = T extends [infer F, ...infer Rest]
  ? GqlMultiParams<
      Rest,
      O,
      [...R, O extends "query" ? GqlParams<F, O> : Required<GqlParams<F, O>>]
    >
  : R

export type isTuple<T> = [T] extends [never]
  ? false
  : T extends readonly unknown[]
  ? number extends T["length"]
    ? false
    : true
  : false
