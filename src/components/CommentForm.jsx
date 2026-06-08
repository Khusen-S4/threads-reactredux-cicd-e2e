import '../styles/CommentForm.css'

function CommentForm ({
  content,
  onChange,
  onSubmit
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="comment-form"
    >
      <textarea
        placeholder="Tulis komentar..."
        value={content}
        onChange={onChange}
        className="comment-textarea"
      />

      <button
        type="submit"
        className="comment-submit"
      >
        Kirim
      </button>
    </form>
  )
}

export default CommentForm
