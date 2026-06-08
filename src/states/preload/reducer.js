function preloadReducer (isLoading = false, action = {}) {
  switch (action.type) {
  case 'SHOW_LOADING':
    return true
  case 'HIDE_LOADING':
    return false
  default:
    return isLoading
  }
}

export default preloadReducer
