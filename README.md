# ohmygraphql

a customize graphql hook for client in Javascript.

## features

- just generate graphql query string
- written by typescript

## how to use

```ts
declare const useGraphqlQuery: <DataType extends Record<string, unknown>>(
  type: QueryType,
  action: ActionType | CreateAction,
  queryOptions: QueryOptions<DataType>,
) => string
```

for examples:

```ts
type User = {
  id: number
  name: string
  age: number
}

// query =>  {getUser{id name}}
const query = useGraphqlQuery<User>(
  "query",
  () => ({ base: "getUser", input: "getInput" }),
  { resource: "user", fields: ["id", "name"] },
)

// mutation =>  mutation{modifyUser(modifyUserInput:{id:1,age:16}){id name age}}
const mutation = useGraphqlQuery<User>(
  "mutation",
  () => ({ base: "modifyUser", input: "modifyUserInput" }),
  {
    resource: "user",
    fields: ["id", "name", "age"],
    args: { id: 1, age: 16 },
  },
)
```

## server support

It's a highly self-customized hook.

If you want to use preset five preset five kinds of queries and your server use nestjs, you may need to change server codes... TwT...

A simple example:

```ts
// client
// preset five kinds of queries

// create   =>  mutation{createUser(createUserInput:{id:1}){id name age}}
// find     =>  {findUser(findUserInput:{id:1}){id name age}}
// findSome =>  {findUsers(findUsersInput:{id:1}){id name age}}
// update   =>  mutation{updateUser(updateUserInput:{id:1}){id name age}}
// remove   =>  mutation{removeUser(removeUserInput:{id:1}){id name age}}
```

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
