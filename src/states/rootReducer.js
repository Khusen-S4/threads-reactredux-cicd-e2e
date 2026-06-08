import { combineReducers } from 'redux'
import threadsReducer from './threads/reducer'
import preloadReducer from './preload/reducer'
import errorReducer from './error/reducer'
import authUserReducer from './authUser/reducer'
import threadDetailReducer from './threadDetail/reducer'
import usersReducer from './users/reducer'
import leaderboardsReducer from './leaderboards/reducer'

const rootReducer = combineReducers({
  threads: threadsReducer,
  preload: preloadReducer,
  error: errorReducer,
  authUser: authUserReducer,
  threadDetail: threadDetailReducer,
  users: usersReducer,
  leaderboards: leaderboardsReducer
})

export default rootReducer
