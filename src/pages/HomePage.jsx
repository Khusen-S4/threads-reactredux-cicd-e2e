import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncReceiveThreads } from '../states/threads/action'
import { asyncToggleUpVote, asyncToggleDownVote } from '../states/threads/action'

import FooterTag from '../components/FooterTag'
import CreateButton from '../components/CreateButton'
import User from '../components/User'
import ThreadFooter from '../components/ThreadFooter'

import { Link } from 'react-router-dom'

function HomePage () {
  const dispatch = useDispatch()

  const threads = useSelector((states) => states.threads.data) // data awal kosong threads : []
  const isLoading = useSelector((states) => states.threads.isLoading)
  const error = useSelector((states) => states.error)

  const users = useSelector((states) => states.users)

  useEffect(() => {
    dispatch(asyncReceiveThreads())
  }, [dispatch])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>
  }

  // dibawah ini adalah UI ketika state berubah dari reducer.js
  return (
    <div className="container">
      <FooterTag />
      <User />
      <h1>Cari Jodoh</h1>
      <CreateButton />

      {threads.map((thread) => {
        const owner = users.find(
          (user) => user.id === thread.ownerId
        )

        return (
          <div key={thread.id} className="card">
            <Link to={`/threads/${thread.id}`}>
              <h3>{thread.title}</h3>
            </Link>

            <div
              dangerouslySetInnerHTML={{ __html: thread.body }}
            />

            <ThreadFooter
              thread={thread}
              owner={owner}
              onUpVote={() =>
                dispatch(asyncToggleUpVote(thread.id))
              }
              onDownVote={() =>
                dispatch(asyncToggleDownVote(thread.id))
              }
            />

          </div>
        )
      })}
    </div>
  )
}

export default HomePage

// Alur kerja :
// Component
//    ↓
// dispatch(asyncAction)
//    ↓
// middleware (thunk) ambil data
//    ↓
// API call
//    ↓
// dispatch(action biasa)
//    ↓
// reducer update state / data yang di tampilkan
//    ↓
// React rerender
//    ↓
// UI tampil

// Alur setelah fitur loading
// Component load
//    ↓
// dispatch asyncReceiveThreads
//    ↓
// SHOW_LOADING → preload = true
//    ↓
// UI tampil "Loading..."
//    ↓
// API selesai
//    ↓
// RECEIVE_THREADS
//    ↓
// HIDE_LOADING → preload = false
//    ↓
// UI tampil data

// Alur Lengkap setelah fitur Error
// Component load
//    ↓
// dispatch async action
//    ↓
// SHOW_LOADING
//    ↓
// CLEAR_ERROR
//    ↓
// TRY API
//    ↓         ↓
// SUCCESS     ERROR
//    ↓         ↓
// SET DATA   SET ERROR
//    ↓         ↓
// HIDE_LOADING
//    ↓
// UI update

// Alur Logout
// User klik Logout
//    ↓
// dispatch asyncUnsetAuthUser
//    ↓
// removeAccessToken()
//    ↓
// UNSET_AUTH_USER
//    ↓
// Redux update (authUser = null)
//    ↓
// App rerender
//    ↓
// LoginPage tampil

// Alur Vote
// Klik 👍
//    ↓
// dispatch asyncToggleUpVote
//    ↓
// Redux update langsung
//    ↓
// UI berubah instan
//    ↓
// API request
