export const useGraphqlQuery = <T extends string>(
  resource: string,
  fields: T[],
) => ({
  body: {
    query: `{${resource}{${fields.join(" ")}}}`,
  },
})

export type GraphqlResponse<Resource extends string, Fields extends string> = {
  data: {
    [P in Resource]: Record<Fields, any>
  }
}

export const useGraphqlMutation = (
  mutation: string,
  resource: string,
  data: Record<string, any>,
) => ({
  body: {
    query: `{${mutation}(${resource}:${data}){${Object.keys(data).join(" ")}}}`,
  },
})
