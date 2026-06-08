import {
  getAllThreads,
  getAllUsers,
  createThread,
  upVoteThread,
  downVoteThread,
  neutralVoteThread
} from '../../utils/api'
import { receiveUsersActionCreator } from '../users/action'
import {
  setErrorActionCreator
} from '../error/action'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS'
}

function receiveThreadsActionCreator (threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads }
  }
}

function asyncReceiveThreads () {
  return async (dispatch) => {
    dispatch({ type: 'THREADS_LOADING' })

    try {
      const threads = await getAllThreads()
      const users = await getAllUsers()

      dispatch(receiveThreadsActionCreator(threads))
      dispatch(receiveUsersActionCreator(users))
    } catch (error) {
      dispatch(setErrorActionCreator(error.message))
    }

    dispatch({ type: 'THREADS_LOADED' })
  }
}
// Action create thread
function addThreadActionCreator (thread) {
  return {
    type: 'ADD_THREAD',
    payload: { thread }
  }
}
function asyncAddThread ({ title, body }) {
  return async (dispatch) => {
    try {
      const thread = await createThread({ title, body })
      dispatch(addThreadActionCreator(thread))
    } catch (error) {
      alert(error.message)
    }
  }
}

// Action Vote Up
function toggleUpVoteActionCreator ({ threadId, userId }) {
  return {
    type: 'TOGGLE_UP_VOTE',
    payload: {
      threadId,
      userId
    }
  }
}
// Action Vote Down
function toggleDownVoteActionCreator ({ threadId, userId }) {
  return {
    type: 'TOGGLE_DOWN_VOTE',
    payload: {
      threadId,
      userId
    }
  }
}
// Up Vote async
function asyncToggleUpVote (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()

    const thread = getState().threads.data.find(
      (thread) => thread.id === threadId
    )

    const isUpVoted = thread.upVotesBy.includes(authUser.id)

    dispatch(toggleUpVoteActionCreator({
      threadId,
      userId: authUser.id
    }))

    try {
      if (isUpVoted) {
        await neutralVoteThread(threadId)
      } else {
        await upVoteThread(threadId)
      }
    } catch (error) {
      alert(error.message)
    }
  }
}
//  Down Vote async
function asyncToggleDownVote (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()

    const thread = getState().threads.data.find(
      (thread) => thread.id === threadId
    )

    const isDownVoted = thread.downVotesBy.includes(authUser.id)

    dispatch(toggleDownVoteActionCreator({
      threadId,
      userId: authUser.id
    }))

    try {
      if (isDownVoted) {
        await neutralVoteThread(threadId)
      } else {
        await downVoteThread(threadId)
      }
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  asyncReceiveThreads,
  asyncAddThread,

  asyncToggleUpVote,
  asyncToggleDownVote
}
