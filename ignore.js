module.exports = function ignore(array) {
  if ('string' === typeof array) {
    array = array.split(/\n+/)
  }
  const rules = []
  for(let rule of array) {
    rule = rule.split('#')[0].trim()
    if (rule) {
      if (rule.indexOf('*') >= 0) {
        rule = new RegExp(rule
          .replace(/\./g, '\\.')
          .replace(/\*/g, '.*'))
      }
      rules.push(rule)
    }
  }
  return rules
}
