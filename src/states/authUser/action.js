import { login, putAccessToken, getOwnProfile } from '../../utils/api'
import { register } from '../../utils/api'
import { removeAccessToken } from '../../utils/api'

function setAuthUserActionCreator (authUser) {
  return {
    type: 'SET_AUTH_USER',
    payload: { authUser }
  }
}

function unsetAuthUserActionCreator () {
  return {
    type: 'UNSET_AUTH_USER'
  }
}

// Async Login
function asyncSetAuthUser ({ email, password }) {
  return async (dispatch) => {
    const token = await login({ email, password })

    putAccessToken(token)

    const authUser = await getOwnProfile()

    dispatch(setAuthUserActionCreator(authUser))
  }
}

// Async Register
function asyncRegisterUser ({ name, email, password }) {
  return async () => {
    try {
      await register({ name, email, password })
      alert('Register berhasil! Silakan login.')
    } catch (error) {
      alert(error.message)
    }
  }
}
// asyncPreloadProcess
let isPreloadCalled = false // ⬅️ global flag

function asyncPreloadProcess () {
  return async (dispatch) => {
    if (isPreloadCalled) return
    isPreloadCalled = true

    console.log('🔥 PRELOAD JALAN')

    // dispatch(showLoadingActionCreator());

    try {
      const authUser = await getOwnProfile()
      dispatch(setAuthUserActionCreator(authUser))
    } catch (error) {
      console.error(error)
      dispatch(unsetAuthUserActionCreator())
    }
  }
}

// logout
function asyncUnsetAuthUser () {
  return (dispatch) => {
    removeAccessToken() // hapus token
    dispatch(unsetAuthUserActionCreator()) // reset Redux
  }
}

export {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncRegisterUser,
  asyncPreloadProcess,
  asyncUnsetAuthUser
}

// ini adalah thunk yang bisa di uji 
//   asyncSetAuthUser,
//   asyncRegisterUser,
//   asyncPreloadProcess,
//   asyncUnsetAuthUser