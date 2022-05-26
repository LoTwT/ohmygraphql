import { removeInitial, isEmptyObj } from "./helper"
import { BaseObject, GqlParams, GqlScope, GqlScopeBody } from "./types"
import { ref, ReactiveEffect, isRef, Ref } from "@vue/reactivity"

export const useGraphql = (options: GqlParams) => {
  const { operation, scope } = options
  return `${operation}{${serializeScope(scope)}}`
}

export const serializeScope = (scope: GqlScope) => {
  const { name, args, body: fields } = scope
  let argsStr = ""
  let fieldsStr = ""

  if (args) argsStr = serializeArgs(args)

  fieldsStr = serializeBody(fields)

  return `${name}${argsStr}${fieldsStr}`
}

export const serializeObj = (obj: BaseObject, s = "") => {
  for (const key in obj) {
    const value = obj[key]

    if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length === 0) s += `,${key}:{}`
      else s += `,${key}:{${serializeObj(value as BaseObject)}}`
    } else if (typeof value === "string") {
      s += `,${key}:"${value}"`
    } else {
      s += `,${key}:${value}`
    }
  }

  return removeInitial(s, ",")
}

export const serializeArgs = (args: BaseObject) =>
  isEmptyObj(args) ? "" : `(${serializeObj(args)})`

export const serializeBody = (fields: GqlScopeBody) => {
  let ret = ""

  for (let i = 0; i < fields.length; i++) {
    const f = fields[i]

    if (typeof f === "string") ret += `,${f}`
    else ret += `,${serializeScope(f)}`
  }

  return `{${removeInitial(ret, ",")}}`
}

export const useReactiveGraphql = (options: GqlParams | Ref<GqlParams>) => {
  const optionsRef = isRef(options) ? options : ref(options)
  const query = ref("")

  const watcher = new ReactiveEffect(() => {
    query.value = useGraphql(optionsRef.value)
  })

  watcher.run()

  return {
    query: query,
    options: optionsRef,
    stop: () => watcher.stop(),
    run: () => watcher.run(),
  }
}
