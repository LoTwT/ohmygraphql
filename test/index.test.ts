import {
  createArgsString,
  createDefaultAction,
  createFieldsString,
  createQuery,
  useGraphqlQuery,
} from "../src"

describe("useGraphqlQuery", () => {
  it("happy path", () => {
    const { create, find, findAll, update, remove } = useGraphqlQuery(
      "user",
      ["id", "age"],
      { id: 2 },
    )

    expect(create).toMatchInlineSnapshot(
      '"mutation{createUser(createUserInput:{id:2}){id age}}"',
    )
    expect(find).toMatchInlineSnapshot(
      '"{findUser(findUserInput:{id:2}){id age}}"',
    )
    expect(findAll).toMatchInlineSnapshot(
      '"{findUsers(findUsersInput:{id:2}){id age}}"',
    )
    expect(update).toMatchInlineSnapshot(
      '"mutation{updateUser(updateUserInput:{id:2}){id age}}"',
    )
    expect(remove).toMatchInlineSnapshot(
      '"mutation{removeUser(removeUserInput:{id:2}){id age}}"',
    )
  })

  it("createDefaultAction", () => {
    const a1 = createDefaultAction("create", "user")
    const a2 = createDefaultAction("find", "user")
    const a3 = createDefaultAction("findAll", "user")
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
    expect(s).toMatchInlineSnapshot('"(createTestInput:{a:A,b:B})"')
  })

  it("createQuery create", () => {
    const query = createQuery("mutation", "create", {
      resource: "user",
      fields: ["id", "age"],
      args: { id: 2 },
    })
    expect(query).toBe("mutation{createUser(createUserInput:{id:2}){id age}}")
  })

  it("createQuery find", () => {
    const query = createQuery("query", "find", {
      resource: "user",
      fields: ["id", "age"],
      args: { id: 2 },
    })
    expect(query).toBe("{findUser(findUserInput:{id:2}){id age}}")
  })

  it("createQuery findAll", () => {
    const query = createQuery("query", "findAll", {
      resource: "user",
      fields: ["id", "age"],
      args: { id: 2 },
    })
    expect(query).toBe("{findUsers(findUsersInput:{id:2}){id age}}")
  })

  it("createQuery update", () => {
    const query = createQuery("mutation", "update", {
      resource: "user",
      fields: ["id", "age"],
      args: { id: 2 },
    })
    expect(query).toBe("mutation{updateUser(updateUserInput:{id:2}){id age}}")
  })

  it("createQuery remove", () => {
    const query = createQuery("mutation", "remove", {
      resource: "user",
      fields: ["id", "age"],
      args: { id: 2 },
    })
    expect(query).toBe("mutation{removeUser(removeUserInput:{id:2}){id age}}")
  })
})
