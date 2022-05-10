# ohmygraphql

a customize graphql hook for client in Javascript.

## features

- just generate graphql query string
- written by typescript

## how to use

```ts
import { useGraphqlQuery, createQuery } from "ohmygraphql"
```

for examples:

```ts
type User = {
  id: number
  name: string
  age: number
}

// preset five kinds of graphql query strings corresponding to nestjs crud template
// maybe not all of fives can satisfy requirements, recomend to use createQuery
const { create, find, findSome, update, remove } = useGraphqlQuery<User>({
  resource: "user",
  fields: ["id", "name", "age"],
  args: { id: 1 },
})

// create   =>  mutation{createUser(createUserInput:{id:1}){id name age}}
// find     =>  {findUser(findUserInput:{id:1}){id name age}}
// findSome =>  {findUsers(findUsersInput:{id:1}){id name age}}
// update   =>  mutation{updateUser(updateUserInput:{id:1}){id name age}}
// remove   =>  mutation{removeUser(removeUserInput:{id:1}){id name age}}
```

```ts
const query = createQuery<User>(
  "query",
  () => ({ base: "getUser", input: "getInput" }),
  { resource: "user", fields: ["id", "name"] },
)
// query =>  {getUser{id name}}

const mutation = createQuery<User>(
  "mutation",
  () => ({ base: "modifyUser", input: "modifyUserInput" }),
  {
    resource: "user",
    fields: ["id", "name", "age"],
    args: { id: 1, age: 16 },
  },
)

// mutation =>  mutation{modifyUser(modifyUserInput:{id:1,age:16}){id name age}}
```

## server support

It's a highly self-customized hook, you may change server codes... TwT...

A simple example:

```ts
// nestjs => user.resolver.ts

import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { UserService } from "./user.service"
import { User } from "./entities/user.entity"
import { CreateUserInput } from "./dto/create-user.input"
import { UpdateUserInput } from "./dto/update-user.input"
import { RemoveUserInput } from "./dto/remove-user.input"
import { FindUserInput } from "./dto/find-user.input"
import { FindUsersInput } from "./dto/find-users.input"

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query(() => [User])
  findUsers(@Args("findUsersInput") FindUserInput?: FindUsersInput) {
    return this.userService.findSome(FindUserInput)
  }

  @Query(() => User)
  findUser(@Args("findUserInput") findUserInput: FindUserInput) {
    return this.userService.findOne(findUserInput.id)
  }

  @Mutation(() => User)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  removeUser(@Args("removeUserInput") removeUserInput: RemoveUserInput) {
    return this.userService.remove(removeUserInput.id)
  }
}
```
