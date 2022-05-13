import {
  createFieldsString,
  createArgsString,
  useGraphql,
} from "../src/graphql"

describe("useGraphql", () => {
  type User = {
    id: number
    name: string
    age: number
    gender: string
  }

  it("createFieldsString", () => {
    const s = createFieldsString(["a", "b", "c"])
    expect(s).toMatchInlineSnapshot('"a b c"')
  })

  it("createArgsString", () => {
    const user = {
      id: 1,
      name: "user",
      isStudent: true,
    }
    expect(createArgsString(user, "createUserInput")).toMatchInlineSnapshot(
      '"(createUserInput:{id:1,name:\\"user\\",isStudent:true})"',
    )

    const emptyObj = {}
    expect(createArgsString(emptyObj, "findUsersInput")).toMatchInlineSnapshot(
      '"(findUsersInput:{})"',
    )

    const nestedObj = {
      id: 1,
      name: "user",
      nested: {
        id: 2,
        name: "nest",
        empty: {},
      },
    }

    expect(createArgsString(nestedObj, "nestedInput")).toMatchInlineSnapshot(
      '"(nestedInput:{id:1,name:\\"user\\",nested:{id:2,name:\\"nest\\",empty:{}}})"',
    )

    const nullValueObj = {
      value: null,
    }

    expect(createArgsString(nullValueObj, "nullInput")).toMatchInlineSnapshot(
      '"(nullInput:{value:null})"',
    )
  })

  it("create", () => {
    const query = useGraphql<User>({
      operation: "mutation",
      params: {
        action: {
          type: "create-user",
          input: "createUserInput",
        },
        fields: ["id", "age"],
        args: { name: "username", age: 18, gender: "male" },
      },
    })
    expect(query).toMatchInlineSnapshot(
      '"mutation{createUser(createUserInput:{name:\\"username\\",age:18,gender:\\"male\\"}){id age}}"',
    )
  })

  it("find", () => {
    const query = useGraphql<User>({
      operation: "query",
      params: {
        action: {
          type: "findUser",
          input: "find-user-input",
        },
        fields: ["id", "age"],
        args: { id: 2 },
      },
    })
    expect(query).toMatchInlineSnapshot(
      '"query{findUser(findUserInput:{id:2}){id age}}"',
    )
  })

  it("findAll", () => {
    const query = useGraphql<User>({
      operation: "query",
      params: {
        action: {
          type: "findUsers",
          input: "findUsersInput",
        },
        fields: ["id", "age"],
        args: {},
      },
    })
    expect(query).toMatchInlineSnapshot('"query{findUsers{id age}}"')
  })

  it("update", () => {
    const query = useGraphql<User>({
      operation: "mutation",
      params: {
        action: {
          type: "update-user",
          input: "update-user-input",
        },
        fields: ["id", "age"],
        args: { id: 2, name: "modified-username" },
      },
    })
    expect(query).toMatchInlineSnapshot(
      '"mutation{updateUser(updateUserInput:{id:2,name:\\"modified-username\\"}){id age}}"',
    )
  })

  it("remove", () => {
    const query = useGraphql<User>({
      operation: "mutation",
      params: {
        action: {
          type: "remove-user",
          input: "remove-user-input",
        },
        fields: ["id", "age"],
        args: { id: 2 },
      },
    })
    expect(query).toMatchInlineSnapshot(
      '"mutation{removeUser(removeUserInput:{id:2}){id age}}"',
    )
  })
})
