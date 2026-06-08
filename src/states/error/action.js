const ActionType = {
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

function setErrorActionCreator (error) {
  return {
    type: ActionType.SET_ERROR,
    payload: { error }
  }
}

function clearErrorActionCreator () {
  return {
    type: ActionType.CLEAR_ERROR
  }
}

export {
  ActionType,
  setErrorActionCreator,
  clearErrorActionCreator
}
