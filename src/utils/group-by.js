export function groupBy(ary) {
  const result = ary.reduce((acc, prev) => {
    acc[prev.label] = acc[prev.label] || []
    acc[prev.label].push(prev)
    return acc
  }, Object.create(null))

  return result
}
