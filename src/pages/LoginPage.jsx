import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { asyncSetAuthUser } from '../states/authUser/action'

import { Link } from 'react-router-dom'
import '../styles/LoginPage.css'

import { motion } from 'framer-motion'

function LoginPage () {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  function onSubmit (data) {
    dispatch(asyncSetAuthUser(data))
  }

  return (
    <div className="login-page">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <h2>Login</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
        >
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email wajib diisi',
            })}
          />
          {errors.email && (
            <p>{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password wajib diisi',
              minLength: {
                value: 6,
                message: 'Password minimal 6 karakter',
              },
            })}
          />
          {errors.password && (
            <p>{errors.password.message}</p>
          )}

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

      </motion.div>
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
