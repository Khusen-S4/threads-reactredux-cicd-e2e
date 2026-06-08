import { getLeaderboards } from '../../utils/api'

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS'
}

function receiveLeaderboardsActionCreator (
  leaderboards
) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards
    }
  }
}

function asyncReceiveLeaderboards () {
  return async (dispatch) => {

    dispatch({
      type: 'LEADERBOARDS_LOADING'
    })

    try {
      const leaderboards =
        await getLeaderboards()

      dispatch(
        receiveLeaderboardsActionCreator(
          leaderboards
        )
      )
    } catch (error) {
      alert(error.message)
    }

    dispatch({
      type: 'LEADERBOARDS_LOADED'
    })
  }
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards
}
