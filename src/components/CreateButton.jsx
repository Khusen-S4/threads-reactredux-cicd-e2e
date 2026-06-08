import { Link } from 'react-router-dom'

import '../styles/CreateButton.css'

function CreateButton () {
  return (
    <Link to="/create" className="create-button">
      +
    </Link>
  )
}

export default CreateButton
