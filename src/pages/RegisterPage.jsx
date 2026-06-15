import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { asyncRegisterUser } from '../states/authUser/action'

import '../styles/RegisterPage.css'
import { motion } from 'framer-motion'

function RegisterPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function onSubmit (data) {
    await dispatch(asyncRegisterUser(data))

    navigate('/')
  }

  return (
    <div className="register-page">
      <motion.div
        className="register-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <h2>Register</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="register-form"
        >
          <input
            type="text"
            placeholder="Nama"
            {...register('name', {
              required: 'Nama wajib diisi',
            })}
          />
          {errors.name && (
            <p>{errors.name.message}</p>
          )}

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

      </motion.div>
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
