import { ActionType } from './action'

const initialState = {
  data: [],
  isLoading: false
}

// setelah dispatch di action.js masuk kesini Update state
function threadsReducer (state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return {
      ...state,
      data: action.payload.threads
    }

  case 'THREADS_LOADING':
    return {
      ...state,
      isLoading: true
    }

  case 'THREADS_LOADED':
    return {
      ...state,
      isLoading: false
    }

    // create Thread
  case 'ADD_THREAD':
    return {
      ...state,
      data: [action.payload.thread, ...state.data]
    }

    // ---
  default:
    return state

    // Up Vote
  case 'TOGGLE_UP_VOTE':
    return {
      ...state,
      data: state.data.map((thread) => {
        if (thread.id === action.payload.threadId) {

          const isVoted = thread.upVotesBy.includes(
            action.payload.userId
          )

          return {
            ...thread,

            upVotesBy: isVoted
              ? thread.upVotesBy.filter(
                (id) => id !== action.payload.userId
              )
              : thread.upVotesBy.concat(action.payload.userId),

            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          }
        }

        return thread
      })
    }
    // Down Vote
  case 'TOGGLE_DOWN_VOTE':
    return {
      ...state,
      data: state.data.map((thread) => {
        if (thread.id === action.payload.threadId) {

          const isVoted = thread.downVotesBy.includes(
            action.payload.userId
          )

          return {
            ...thread,

            downVotesBy: isVoted
              ? thread.downVotesBy.filter(
                (id) => id !== action.payload.userId
              )
              : thread.downVotesBy.concat(action.payload.userId),

            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          }
        }

        return thread
      })
    }
  }
}
// hasil State berubah dari awalnya kosong [] menjadi [thread1, thread2, thread3, ...]

export default threadsReducer
