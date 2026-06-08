import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { asyncRegisterUser } from '../states/authUser/action'

import '../styles/RegisterPage.css'
function RegisterPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit (e) {
    e.preventDefault()

    await dispatch(asyncRegisterUser({ name, email, password }))

    // setelah sukses → ke login
    navigate('/')
  }

  return (
    <div className="register-page">
      <div className="register-card">

        <h2>Register</h2>

        <form
          onSubmit={onSubmit}
          className="register-form"
        >
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Register
          </button>
        </form>

        <p className="register-footer">
          Sudah punya akun?
          {' '}
          <Link to="/">
            Login di sini
          </Link>
        </p>

      </div>
    </div>
  )
}

export default RegisterPage

// Alur Register
// User isi form
//    ↓
// submit
//    ↓
// dispatch asyncRegisterUser
//    ↓
// API /register
//    ↓
// SUCCESS → alert sukses
//    ↓
// redirect ke LoginPage
