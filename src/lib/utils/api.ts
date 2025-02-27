export const invalidateTags = function(keys: string[]) {
  return (key: string | string[]) => (
    (typeof key === 'string')
      ? keys.includes(key)
      : key instanceof Array
        ? keys.includes(key[0])
        : false
  )
}