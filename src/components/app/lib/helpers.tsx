export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export const truncate = (str: string, n: number, useWordBoundary: boolean) => {
  if (str.length <= n) {
    return str
  }
  const subString = str.slice(0, n - 1)
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "..."
  )
}
