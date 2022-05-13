# ohmygraphql

A customize graphql hook for client in Javascript / Typescript.

## features

- just generate query string
- typescript friendly
- more lightweight

but

- not generate from `.gql` or `.graphql`
- only depend on the params and types you pass
- you may need to know nearly full of graphql apis the server supplies for better use

## how to use

```ts
import { useGraphql } from "ohmygraphql"

type User = {
  id: number
  name: string
  age: number
  gender: string
}

type Article = {
  id: number
  title: string
  content: string
  createAt: string
  updateAt: string
}

// basic query
const basicQuery = useGraphql<User>({
  operation: "query",
  params: {
    action: {
      type: "user",
    },
    fields: ["id", "name"],
  },
})

// basic mutation
const basicMutation = useGraphql<User>({
  operation: "mutation",
  params: {
    action: {
      type: "createUser",
      input: "createUserInput",
    },
    fields: ["id", "name", "age"],
    args: { name: "u1", age: 18, gender: "male" },
  },
})

// multiple queries
// query can also pass args
const multiQueries = useGraphql<[User, Article]>({
  operation: "query",
  params: [
    {
      action: {
        type: "findUser",
        input: "findUserInput",
      },
      fields: ["id", "name", "age", "gender"],
      args: { id: 1 },
    },
    {
      action: {
        type: "findArticles",
        input: "findArticlesInput",
      },
      fields: ["id", "title", "content", "createAt", "updateAt"],
    },
  ],
})

// multiple mutations
const multiMutations = useGraphql<[User, Article]>({
  operation: "mutation",
  params: [
    {
      action: {
        type: "createUser",
        input: "createUserInput",
      },
      fields: ["id", "name", "age", "gender"],
      args: { name: "u1", age: 18, gender: "male" },
    },
    {
      action: {
        type: "updateArticle",
        input: "updateArticleInput",
      },
      fields: ["id", "title", "content", "createAt", "updateAt"],
      args: { id: 1, title: "newTitle", content: "newContent" },
    },
  ],
})
```

## todolist

- [x] customized query string
- [x] basic typescript annotation
- [x] stringify nested args
- [x] api refactor
- [x] multiple actions
- [x] advanced typescript annotation (when a query returns union type)

<br />

- [ ] reactive query string
- [ ] graphql meta fields

## license

[MIT](./LICENSE)
