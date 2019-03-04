export const ValidateText = ({ text, length }) => {
  if (text) {
    return text.length >= length
  }
  return null
}

export const ValidationNumber = ({ number, test: { value, validation }}) => {
  if (number && number !== '') {
    const test = parseInt(number)

    if (isNaN(test)) {
      return false
    }

    switch (validation) {
      case '>': return test > value
      case '>=': return test >= value
      case '<': return test < value
      case '<=': return test <= value
      case '===': case '==': return test === value
      default: return null
    }
  }
  return null
}
