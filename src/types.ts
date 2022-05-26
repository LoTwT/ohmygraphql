export type BaseObject = Record<string, unknown>

export type GqlParams = {
  operation: "query" | "mutation"
  scope: GqlScope
}

export type GqlScope = {
  name: string
  args?: BaseObject
  body: GqlScopeBody
}

export type GqlScopeBody = string[] | (string | GqlScope)[]

export type isTuple<T> = [T] extends [never]
  ? false
  : T extends readonly unknown[]
  ? number extends T["length"]
    ? false
    : true
  : false
