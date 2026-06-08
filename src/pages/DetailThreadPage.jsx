import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleThreadDetailUpVote,
  asyncToggleThreadDetailDownVote,
  asyncToggleCommentUpVote,
  asyncToggleCommentDownVote } from '../states/threadDetail/action'

import FooterTag from '../components/FooterTag'
import DetailThreadFooter from '../components/DetailThreadFooter'
import CommentItem from '../components/CommentItem'
import CommentForm from '../components/CommentForm'

function DetailThreadPage () {
  const { id } = useParams()
  const dispatch = useDispatch()

  const threadDetail = useSelector((states) => states.threadDetail)

  const [content, setContent] = useState('') // create komentar

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id))
  }, [id, dispatch])

  if (!threadDetail) {
    return <p>Loading detail...</p>
  }

  // Handler create komentar
  function onSubmitComment (e) {
    e.preventDefault()

    dispatch(asyncAddComment({
      threadId: id,
      content
    }))

    setContent('')
  }

  return (
    <div className="container">
      <FooterTag />
      <div className="card">
        <h2>{threadDetail.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />

        <DetailThreadFooter
          threadDetail={threadDetail}
          onUpVote={() =>
            dispatch(asyncToggleThreadDetailUpVote())
          }
          onDownVote={() =>
            dispatch(asyncToggleThreadDetailDownVote())
          }
        />

      </div>

      <CommentForm
        content={content}
        onChange={(e) => setContent(e.target.value)}
        onSubmit={onSubmitComment}
      />

      <h3>Komentar</h3>

      {threadDetail.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onUpVote={() =>
            dispatch(asyncToggleCommentUpVote(comment.id))
          }
          onDownVote={() =>
            dispatch(asyncToggleCommentDownVote(comment.id))
          }
        />
      ))}
    </div>
  )
}

export default DetailThreadPage
