# ohmygraphql

A GraphQL hook to generate query string for client in Javascript / Typescript.

It just generates query string, but not depends on `.gql` or `.graphql`.

:cry: It's too hard for me to make it more friendly with typescript.

## use

```typescript
import { useGraphql } from "ohmygraphql"

const query = useGraphql({
  operation: "query",
  scope: {
    name: "user",
    // args: {}, // if use mutation, args are required
    body: ["id", "name" /** { ... } another scope */],
  },
})

// result: query{user{id,name}}
```

## license

[MIT](./LICENSE)
