import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import DetailThreadPage from './pages/DetailThreadPage'
import CreateThreadPage from './pages/CreateThreadPage'
import LeaderboardsPage from './pages/LeaderboardsPage'

import { asyncPreloadProcess } from './states/authUser/action'

function App () {
  const dispatch = useDispatch()

  const authUser = useSelector((states) => states.authUser)
  const [isAppReady, setIsAppReady] = useState(false)

  useEffect(() => {
    dispatch(asyncPreloadProcess()).then(() => {
      setIsAppReady(true)
    })
  }, [dispatch])

  if (!isAppReady) {
    return <p>Loading app...</p>
  }

  if (!authUser) {
    return (
      <>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* route liar */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer />
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:id" element={<DetailThreadPage />} />
        <Route path="/create" element={<CreateThreadPage />} />
        <Route
          path="/leaderboards"
          element={<LeaderboardsPage />}
        />

        {/* route liar */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer />
    </>
    
  )
}
export default App

// User buka app / refresh
//    ↓
// App.jsx load
//    ↓
// dispatch asyncPreloadProcess
//    ↓
// SHOW_LOADING
//    ↓
// getOwnProfile (pakai token)
//    ↓
// SUCCESS         ERROR
//    ↓             ↓
// SET_AUTH_USER   UNSET_AUTH_USER
//    ↓             ↓
// HIDE_LOADING
//    ↓
// App render ulang
//    ↓
// HomePage / LoginPage
