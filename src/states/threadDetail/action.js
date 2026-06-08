import { getThreadDetail, createComment } from '../../utils/api'
import {
  upVoteThread,
  downVoteThread,
  neutralVoteThread,

  upVoteComment,
  downVoteComment,
  neutralVoteComment
} from '../../utils/api'

function receiveThreadDetailActionCreator (threadDetail) {
  return {
    type: 'RECEIVE_THREAD_DETAIL',
    payload: { threadDetail }
  }
}

function clearThreadDetailActionCreator () {
  return {
    type: 'CLEAR_THREAD_DETAIL'
  }
}

function asyncReceiveThreadDetail (threadId) {
  return async (dispatch) => {
    try {
      const threadDetail = await getThreadDetail(threadId)
      dispatch(receiveThreadDetailActionCreator(threadDetail))
    } catch (error) {
      alert(error.message)
    }
  }
}
// Action Creator komentar
function addCommentActionCreator (comment) {
  return {
    type: 'ADD_COMMENT',
    payload: { comment }
  }
}
// Create Komentar
function asyncAddComment ({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await createComment({ threadId, content })
      dispatch(addCommentActionCreator(comment))
    } catch (error) {
      alert(error.message)
    }
  }
}
// Up Vote
function toggleThreadDetailUpVoteActionCreator ({
  userId
}) {
  return {
    type: 'TOGGLE_THREAD_DETAIL_UP_VOTE',
    payload: {
      userId
    }
  }
}
// Down Vote
function toggleThreadDetailDownVoteActionCreator ({
  userId
}) {
  return {
    type: 'TOGGLE_THREAD_DETAIL_DOWN_VOTE',
    payload: {
      userId
    }
  }
}
// async Up Vote
function asyncToggleThreadDetailUpVote () {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState()

    const isUpVoted = threadDetail.upVotesBy.includes(
      authUser.id
    )

    dispatch(toggleThreadDetailUpVoteActionCreator({
      userId: authUser.id
    }))

    try {
      if (isUpVoted) {
        await neutralVoteThread(threadDetail.id)
      } else {
        await upVoteThread(threadDetail.id)
      }
    } catch (error) {
      alert(error.message)
    }
  }
}
// async Down Vote
function asyncToggleThreadDetailDownVote () {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState()

    const isDownVoted = threadDetail.downVotesBy.includes(
      authUser.id
    )

    dispatch(toggleThreadDetailDownVoteActionCreator({
      userId: authUser.id
    }))

    try {
      if (isDownVoted) {
        await neutralVoteThread(threadDetail.id)
      } else {
        await downVoteThread(threadDetail.id)
      }
    } catch (error) {
      alert(error.message)
    }
  }
}
// Up Vote komentar
function toggleCommentUpVoteActionCreator ({
  commentId,
  userId
}) {
  return {
    type: 'TOGGLE_COMMENT_UP_VOTE',
    payload: {
      commentId,
      userId
    }
  }
}
// Down Vote Komentar
function toggleCommentDownVoteActionCreator ({
  commentId,
  userId
}) {
  return {
    type: 'TOGGLE_COMMENT_DOWN_VOTE',
    payload: {
      commentId,
      userId
    }
  }
}
// async up vote komentar
function asyncToggleCommentUpVote (commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState()

    const comment = threadDetail.comments.find(
      (comment) => comment.id === commentId
    )

    const isUpVoted = comment.upVotesBy.includes(
      authUser.id
    )

    dispatch(toggleCommentUpVoteActionCreator({
      commentId,
      userId: authUser.id
    }))

    try {
      if (isUpVoted) {
        await neutralVoteComment(
          threadDetail.id,
          commentId
        )
      } else {
        await upVoteComment(
          threadDetail.id,
          commentId
        )
      }
    } catch (error) {
      alert(error.message)
    }
  }
}
// Async Down vote komentar
function asyncToggleCommentDownVote (commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState()

    const comment = threadDetail.comments.find(
      (comment) => comment.id === commentId
    )

    const isDownVoted = comment.downVotesBy.includes(
      authUser.id
    )

    dispatch(toggleCommentDownVoteActionCreator({
      commentId,
      userId: authUser.id
    }))

    try {
      if (isDownVoted) {
        await neutralVoteComment(
          threadDetail.id,
          commentId
        )
      } else {
        await downVoteComment(
          threadDetail.id,
          commentId
        )
      }
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,

  toggleThreadDetailUpVoteActionCreator,
  toggleThreadDetailDownVoteActionCreator,

  asyncToggleThreadDetailUpVote,
  asyncToggleThreadDetailDownVote,

  asyncToggleCommentUpVote,
  asyncToggleCommentDownVote
}

// Alur DetailThread
// User klik thread
//    ↓
// Route /threads/:id
//    ↓
// DetailThreadPage load
//    ↓
// ambil id dari URL
//    ↓
// dispatch asyncReceiveThreadDetail
//    ↓
// API /threads/:id
//    ↓
// Redux update
//    ↓
// UI tampil detail + komentar

// Alur Komentar
// User isi komentar
//    ↓
// submit form
//    ↓
// dispatch asyncAddComment
//    ↓
// API POST /comments
//    ↓
// SUCCESS
//    ↓
// ADD_COMMENT
//    ↓
// Redux update
//    ↓
// UI langsung update
