function postedAt (date) {
  const createdAt = new Date(date)
  const now = new Date()

  const diffTime = now - createdAt

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffTime / (1000 * 60))

  if (diffDays > 0) {
    return `${diffDays} hari lalu`
  }

  if (diffHours > 0) {
    return `${diffHours} jam lalu`
  }

  return `${diffMinutes} menit lalu`
}

export { postedAt }
