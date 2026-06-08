import { useSelector } from 'react-redux'

import '../styles/User.css'

function User () {
  const authUser = useSelector((states) => states.authUser)

  if (!authUser) {
    return null
  }

  return (
    <div className="user-profile">
      <img
        src={authUser.avatar}
        alt={authUser.name}
        className="user-avatar"
      />

      <div>
        <p className="user-name">
          {authUser.name}
        </p>

        <small className="user-email">
          {authUser.email}
        </small>
      </div>
    </div>
  )
}

export default User
