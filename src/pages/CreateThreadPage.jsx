import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FooterTag from '../components/FooterTag'

import { asyncAddThread } from '../states/threads/action'

function CreateThreadPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function onSubmit (e) {
    e.preventDefault()

    dispatch(asyncAddThread({ title, body }))

    navigate('/') // kembali ke HomePage
  }

  return (
    <div >
      <FooterTag />
      <div className="container">
        <div className="card">
          <h2>Buat Thread</h2>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Isi thread"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <button type="submit">Kirim</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateThreadPage

// Alur Create Thread
// User klik "Buat Thread"
//    ↓
// CreateThreadPage
//    ↓
// isi form
//    ↓
// submit
//    ↓
// dispatch asyncAddThread
//    ↓
// API POST /threads
//    ↓
// ADD_THREAD
//    ↓
// Redux update
//    ↓
// navigate ke Home
//    ↓
// thread baru langsung muncul
