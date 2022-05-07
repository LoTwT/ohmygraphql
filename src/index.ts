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
