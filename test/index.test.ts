import { useGraphqlQuery } from "../src"

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
})
