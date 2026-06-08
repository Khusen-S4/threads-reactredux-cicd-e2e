import '../styles/ThreadFooter.css'
import { postedAt } from '../utils/time'

function ThreadFooter ({
  thread,
  owner,
  onUpVote,
  onDownVote
}) {
  return (
    <div className="thread-footer">

      <div className="thread-actions">
        <button onClick={onUpVote}>
          👍 {thread.upVotesBy.length}
        </button>

        <button onClick={onDownVote}>
          👎 {thread.downVotesBy.length}
        </button>

        <span className="thread-comments">
          💬 {thread.totalComments}
        </span>
      </div>

      <small className="thread-date">
        {postedAt(thread.createdAt)}
      </small>

      <div className="thread-user">
        <img
          src={owner?.avatar}
          alt={owner?.name}
          className="avatar"
        />

        <p className="thread-owner">
          Dibuat oleh {owner?.name}
        </p>
      </div>
    </div>
  )
}

export default ThreadFooter
