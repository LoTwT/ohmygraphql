import { capitalize, kebab2Camel } from "../src/helper"

describe("helper", () => {
  it("capitalize", () => {
    const str1 = capitalize("abc")
    const str2 = capitalize("aBC")
    const str3 = capitalize("Abc")

    expect(str1).toBe("Abc")
    expect(str2).toBe("ABC")
    expect(str3).toBe("Abc")
  })

  it("kebab2Camel", () => {
    expect(kebab2Camel("")).toBe("")
    expect(kebab2Camel("-a")).toBe("a")
    expect(kebab2Camel("create-user")).toBe("createUser")
    expect(kebab2Camel("Create-user")).toBe("createUser")
    expect(kebab2Camel("-create-user")).toBe("createUser")
    expect(kebab2Camel("-create - user")).toBe("createUser")
    expect(kebab2Camel("-create - User")).toBe("createUser")
  })
})
