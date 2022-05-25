export type BaseObject = Record<string, unknown>

export type GqlQuery = {
  operation: "query"
  scope: GqlScope
}

export type GqlMutation = {
  operation: "mutation"
  scope: Required<GqlScope>
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
