import {
  createDefaultAction,
  createFieldsString,
  createArgsString,
  useGraphqlQuery,
} from "../src/graphql"

describe("useGraphqlQuery", () => {
  it("createDefaultAction", () => {
    const a1 = createDefaultAction("create", "user")
    const a2 = createDefaultAction("find", "user")
    const a3 = createDefaultAction("findSome", "user")
    const a4 = createDefaultAction("update", "user")
    const a5 = createDefaultAction("remove", "user")

    expect(a1).toMatchInlineSnapshot(`
      {
        "base": "createUser",
        "input": "createUserInput",
      }
    `)
    expect(a2).toMatchInlineSnapshot(`
      {
        "base": "findUser",
        "input": "findUserInput",
      }
    `)
    expect(a3).toMatchInlineSnapshot(`
      {
        "base": "findUsers",
        "input": "findUsersInput",
      }
    `)
    expect(a4).toMatchInlineSnapshot(`
      {
        "base": "updateUser",
        "input": "updateUserInput",
      }
    `)
    expect(a5).toMatchInlineSnapshot(`
      {
        "base": "removeUser",
        "input": "removeUserInput",
      }
    `)
  })

  it("createFieldsString", () => {
    const s = createFieldsString(["a", "b", "c"])
    expect(s).toMatchInlineSnapshot('"a b c"')
  })

  it("createArgsString", () => {
    const s = createArgsString({ a: "A", b: "B" }, "createTestInput")
    expect(s).toMatchInlineSnapshot('"(createTestInput:{a:\\"A\\",b:\\"B\\"})"')
  })

  it("useGraphqlQuery create", () => {
    const query = useGraphqlQuery({
      type: "mutation",
      action: "create",
      resource: "user",
      fields: ["id", "age"],
      args: { name: "username", age: 18, gender: "male" },
    })
    expect(query).toMatchInlineSnapshot(
      '"mutation{createUser(createUserInput:{name:\\"username\\",age:18,gender:\\"male\\"}){id age}}"',
    )
  })

  it("useGraphqlQuery find", () => {
    const query = useGraphqlQuery({
      type: "query",
      action: "find",
      resource: "user",
      fields: ["id", "age"],
      args: { id: 2 },
    })
    expect(query).toMatchInlineSnapshot(
      '"query{findUser(findUserInput:{id:2}){id age}}"',
    )
  })

  it("useGraphqlQuery findAll", () => {
    const query = useGraphqlQuery({
      type: "query",
      action: "findSome",
      resource: "user",
      fields: ["id", "age"],
      args: {},
    })
    expect(query).toMatchInlineSnapshot('"query{findUsers{id age}}"')
  })

  it("useGraphqlQuery update", () => {
    const query = useGraphqlQuery({
      type: "mutation",
      action: "update",
      resource: "user",
      fields: ["id", "age"],
      args: { id: 2, name: "modified-username" },
    })
    expect(query).toMatchInlineSnapshot(
      '"mutation{updateUser(updateUserInput:{id:2,name:\\"modified-username\\"}){id age}}"',
    )
  })

  it("useGraphqlQuery remove", () => {
    const query = useGraphqlQuery({
      type: "mutation",
      action: "remove",
      resource: "user",
      fields: ["id", "age"],
      args: { id: 2 },
    })
    expect(query).toMatchInlineSnapshot(
      '"mutation{removeUser(removeUserInput:{id:2}){id age}}"',
    )
  })
})
