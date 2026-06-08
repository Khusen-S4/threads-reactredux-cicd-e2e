import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../styles/FooterTag.css'

import { asyncUnsetAuthUser } from '../states/authUser/action'

function FooterTag () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onLogout () {
    dispatch(asyncUnsetAuthUser())

    navigate('/')
  }

  return (
    <div className="footer-tag">

      <Link to="/">
        <button>
          📄
          Threads
        </button>
      </Link>
      <Link to="/leaderboards">
        <button>
          🏆 Leaderboards
        </button>
      </Link>
      <button onClick={onLogout}>
        🏃
        Logout
      </button>

    </div>
  )
}

export default FooterTag
