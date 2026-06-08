function authUserReducer (authUser = null, action = {}) {
  switch (action.type) {
  case 'SET_AUTH_USER':
    return action.payload.authUser
  case 'UNSET_AUTH_USER':
    return null
  default:
    return authUser
  }
}

export default authUserReducer
