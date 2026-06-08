const BASE_URL = 'https://forum-api.dicoding.dev/v1'

async function getAllThreads () {
  const response = await fetch(`${BASE_URL}/threads`)
  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }

  return json.data.threads
}

// Login
async function login ({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }

  return json.data.token
}

// Register
async function register ({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }

  return json.data
}

// Simpan Token
function putAccessToken (token) {
  localStorage.setItem('accessToken', token)
}

function getAccessToken () {
  return localStorage.getItem('accessToken')
}

//  Ambil data User Login
async function getOwnProfile () {
  const token = getAccessToken()

  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }

  return json.data.user
}

// Logout
function removeAccessToken () {
  localStorage.removeItem('accessToken')
}

// Detail
async function getThreadDetail (threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`)
  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }

  return json.data.detailThread
}

// create komentar
async function createComment ({ threadId, content }) {
  const token = getAccessToken()

  const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  })

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }

  return json.data.comment
}

// create Thread atau Status
async function createThread ({ title, body }) {
  const token = getAccessToken()

  const response = await fetch(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, body })
  })

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }

  return json.data.thread
}

// Up Vote / suka
async function upVoteThread (threadId) {
  const token = getAccessToken()

  const response = await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }
}

// Down Vote / tidak suka
async function downVoteThread (threadId) {
  const token = getAccessToken()

  const response = await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }
}

// Netral Vote
async function neutralVoteThread (threadId) {
  const token = getAccessToken()

  const response = await fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }
}

// ---
async function getAllUsers () {
  const response = await fetch(`${BASE_URL}/users`)

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }

  return json.data.users
}
// Api Vote Comment
async function upVoteComment (threadId, commentId) {
  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
  )

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }
}

async function downVoteComment (threadId, commentId) {
  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
  )

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }
}

async function neutralVoteComment (threadId, commentId) {
  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
  )

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }
}
//  get Leaderboards
async function getLeaderboards () {
  const response = await fetch(
    `${BASE_URL}/leaderboards`
  )

  const json = await response.json()

  if (json.status !== 'success') {
    throw new Error(json.message)
  }

  return json.data.leaderboards
}

export {
  getAllThreads,
  getAllUsers,

  login,
  register,
  getOwnProfile,
  putAccessToken,
  getAccessToken,
  removeAccessToken,

  getThreadDetail,
  createComment,
  createThread,

  upVoteThread,
  downVoteThread,
  neutralVoteThread,

  upVoteComment,
  downVoteComment,
  neutralVoteComment,

  getLeaderboards
}
