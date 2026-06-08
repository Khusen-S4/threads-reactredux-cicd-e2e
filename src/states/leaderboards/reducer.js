import { ActionType } from './action'

const initialState = {
  data: [],
  isLoading: false
}

function leaderboardsReducer (
  state = initialState,
  action = {}
) {
  switch (action.type) {

  case 'LEADERBOARDS_LOADING':
    return {
      ...state,
      isLoading: true
    }

  case 'LEADERBOARDS_LOADED':
    return {
      ...state,
      isLoading: false
    }

  case ActionType.RECEIVE_LEADERBOARDS:
    return {
      ...state,
      data: action.payload.leaderboards
    }

  default:
    return state
  }
}

export default leaderboardsReducer
