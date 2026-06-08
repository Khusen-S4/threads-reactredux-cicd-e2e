import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncSetAuthUser } from '../states/authUser/action'

import { Link } from 'react-router-dom'
import '../styles/LoginPage.css'

function LoginPage () {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit (e) {
    e.preventDefault()

    dispatch(asyncSetAuthUser({ email, password }))
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Login</h2>

        <form
          onSubmit={onSubmit}
          className="login-form"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          Belum punya akun?
          {' '}
          <Link to="/register">
            Register di sini
          </Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage

// Alur Login :
// User isi form
//    ↓
// dispatch asyncSetAuthUser
//    ↓
// API login → dapat token
//    ↓
// simpan token (localStorage)
//    ↓
// getOwnProfile
//    ↓
// SET_AUTH_USER
//    ↓
// Redux update
//    ↓
// App rerender
//    ↓
// Masuk ke HomePage
