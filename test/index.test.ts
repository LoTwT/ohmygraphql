import { serializeBody, serializeArgs } from "../src/graphql"

describe("useGraphql", () => {
  it("serializeBody", () => {
    const r1 = serializeBody(["x", "ruebe", "zett"])
    const r2 = serializeBody([
      { name: "x", body: ["human"] },
      { name: "ruebe", args: {}, body: ["human"] },
      { name: "zett", args: { type: "delta" }, body: ["human"] },
    ])
    const r3 = serializeBody(["x", { name: "ruebe", body: ["human"] }, "zett"])

    expect(r1).toMatchInlineSnapshot('"{x,ruebe,zett}"')
    expect(r2).toMatchInlineSnapshot(
      '"{x{human},ruebe{human},zett(type:\\"delta\\"){human}}"',
    )
    expect(r3).toMatchInlineSnapshot('"{x,ruebe{human},zett}"')
  })

  it("serializeArgs", () => {
    const r1 = serializeArgs({ ultra: "x", human: "daichi" })
    const r2 = serializeArgs({
      ultra: "zett",
      type: {
        name: "alpha",
        medals: { one: "zero", two: "seven", three: "leo" },
      },
    })

    expect(r1).toMatchInlineSnapshot('"(ultra:\\"x\\",human:\\"daichi\\")"')
    expect(r2).toMatchInlineSnapshot(
      '"(ultra:\\"zett\\",type:{name:\\"alpha\\",medals:{one:\\"zero\\",two:\\"seven\\",three:\\"leo\\"}})"',
    )
  })
})
