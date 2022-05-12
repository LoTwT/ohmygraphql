export const capitalize = (str: string) =>
  str[0].toUpperCase() + str.substring(1)

export const uncapitalize = (str: string) =>
  str[0].toLowerCase() + str.substring(1)

export const kebab2Camel = (str: string) =>
  str
    .split("-")
    .filter(Boolean)
    .map((s, i) => (i !== 0 ? capitalize(s.trim()) : uncapitalize(s.trim())))
    .join("")
