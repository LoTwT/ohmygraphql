import { capitalize } from "../src/helper"

describe("helper", () => {
  it("capitalize", () => {
    const str1 = capitalize("abc")
    const str2 = capitalize("aBC")
    const str3 = capitalize("Abc")

    expect(str1).toBe("Abc")
    expect(str2).toBe("ABC")
    expect(str3).toBe("Abc")
  })
})
