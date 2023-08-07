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

export const timeAgo = (input: Date): string => {
  // @ts-ignore
  var seconds: number = Math.floor((new Date() - input) / 1000)

  var interval: number = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + " years"
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + " months"
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + " days"
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + " hours"
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + " minutes"
  }
  return Math.floor(seconds) + " seconds"
}
