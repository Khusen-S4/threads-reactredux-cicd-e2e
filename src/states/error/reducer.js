function errorReducer (error = null, action = {}) {
  switch (action.type) {
  case 'SET_ERROR':
    return action.payload.error
  case 'CLEAR_ERROR':
    return null
  default:
    return error
  }
}

export default errorReducer
