const initialState = null

function threadDetailReducer (state = initialState, action = {}) {
  switch (action.type) {
  case 'RECEIVE_THREAD_DETAIL':
    return action.payload.threadDetail

  case 'CLEAR_THREAD_DETAIL':
    return null

  default:
    return state

  case 'ADD_COMMENT':
    return {
      ...state,
      comments: [action.payload.comment, ...state.comments] // komentar di taruh di atas terbaru
    }
    // Up Vote
  case 'TOGGLE_THREAD_DETAIL_UP_VOTE': {
    const isUpVoted = state.upVotesBy.includes(
      action.payload.userId
    )

    return {
      ...state,

      upVotesBy: isUpVoted
        ? state.upVotesBy.filter(
          (id) => id !== action.payload.userId
        )
        : state.upVotesBy.concat(action.payload.userId),

      downVotesBy: state.downVotesBy.filter(
        (id) => id !== action.payload.userId
      )
    }
  }
  // Down Vote
  case 'TOGGLE_THREAD_DETAIL_DOWN_VOTE': {
    const isDownVoted = state.downVotesBy.includes(
      action.payload.userId
    )

    return {
      ...state,

      downVotesBy: isDownVoted
        ? state.downVotesBy.filter(
          (id) => id !== action.payload.userId
        )
        : state.downVotesBy.concat(action.payload.userId),

      upVotesBy: state.upVotesBy.filter(
        (id) => id !== action.payload.userId
      )
    }
  }
  // Up vote komentar
  case 'TOGGLE_COMMENT_UP_VOTE':
    return {
      ...state,

      comments: state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {

          const isUpVoted = comment.upVotesBy.includes(
            action.payload.userId
          )

          return {
            ...comment,

            upVotesBy: isUpVoted
              ? comment.upVotesBy.filter(
                (id) => id !== action.payload.userId
              )
              : comment.upVotesBy.concat(
                action.payload.userId
              ),

            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          }
        }

        return comment
      })
    }
    // Down Vote Komentar
  case 'TOGGLE_COMMENT_DOWN_VOTE':
    return {
      ...state,

      comments: state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {

          const isDownVoted = comment.downVotesBy.includes(
            action.payload.userId
          )

          return {
            ...comment,

            downVotesBy: isDownVoted
              ? comment.downVotesBy.filter(
                (id) => id !== action.payload.userId
              )
              : comment.downVotesBy.concat(
                action.payload.userId
              ),

            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          }
        }

        return comment
      })
    }
  }
}

export default threadDetailReducer
