export function uniqueArrayElement(ary) {
  return ary.filter(function (item, pos) {
    return ary.indexOf(item) === pos
  })
}
