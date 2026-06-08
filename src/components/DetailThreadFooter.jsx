import '../styles/DetailThreadFooter.css'
import { postedAt } from '../utils/time'

function DetailThreadFooter ({
  threadDetail,
  onUpVote,
  onDownVote
}) {
  return (
    <div className="detail-thread-footer">

      <div className="detail-thread-actions">
        <button onClick={onUpVote}>
          👍 {threadDetail.upVotesBy.length}
        </button>

        <button onClick={onDownVote}>
          👎 {threadDetail.downVotesBy.length}
        </button>

        <span className="detail-thread-comments">
          💬 {threadDetail.comments.length}
        </span>
      </div>

      <small className="detail-thread-date">
        {postedAt(threadDetail.createdAt)}
      </small>

      <div className="detail-thread-user">
        <img
          src={threadDetail.owner.avatar}
          alt={threadDetail.owner.name}
          className="detail-thread-avatar"
        />

        <p className="detail-thread-owner">
          Dibuat oleh {threadDetail.owner.name}
        </p>
      </div>
    </div>
  )
}

export default DetailThreadFooter
