import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FooterTag from '../components/FooterTag'
import {
  asyncReceiveLeaderboards
} from '../states/leaderboards/action'

import '../styles/Leaderboards.css'

function LeaderboardsPage () {
  const dispatch = useDispatch()

  const leaderboards = useSelector(
    (states) => states.leaderboards.data
  )

  const isLoading = useSelector(
    (states) => states.leaderboards.isLoading
  )

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards())
  }, [dispatch])

  return (
    <div className="leaderboards-page">
      <FooterTag />

      <div className="leaderboards-container">
        <h1 className="leaderboards-title">
          🏆 Leaderboards
        </h1>

        {isLoading ? (
          <p className="loading-text">
            Harap Tunggu Leaderboards masih memuat data...
          </p>
        ) : (
          leaderboards.map((item, index) => (
            <div
              key={item.user.id}
              className="leaderboard-card"
            >
              <h3>
                #{index + 1} {item.user.name}
              </h3>

              <img
                src={item.user.avatar}
                alt={item.user.name}
                className="leaderboard-avatar"
              />

              <p>Score: {item.score}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default LeaderboardsPage

// Alur
// Page load
//    ↓
// dispatch asyncReceiveLeaderboards
//    ↓
// LEADERBOARDS_LOADING
//    ↓
// isLoading true
//    ↓
// UI tampil Loading...
//    ↓
// API selesai
//    ↓
// RECEIVE_LEADERBOARDS
//    ↓
// LEADERBOARDS_LOADED
//    ↓
// UI tampil data
