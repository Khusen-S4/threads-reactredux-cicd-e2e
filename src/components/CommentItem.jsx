import '../styles/CommentItem.css'

import { postedAt } from '../utils/time'

function CommentItem ({
  comment,
  onUpVote,
  onDownVote
}) {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <img
          src={comment.owner.avatar}
          alt={comment.owner.name}
          className="comment-avatar"
        />

        <strong>{comment.owner.name}</strong>
      </div>

      <div
        className="comment-content"
        dangerouslySetInnerHTML={{
          __html: comment.content
        }}
      />

      <small className="comment-time">
        {postedAt(comment.createdAt)}
      </small>

      <div className="comment-actions">
        <button onClick={onUpVote}>
          👍 {comment.upVotesBy.length}
        </button>

        <button onClick={onDownVote}>
          👎 {comment.downVotesBy.length}
        </button>
      </div>
    </div>
  )
}

export default CommentItem
