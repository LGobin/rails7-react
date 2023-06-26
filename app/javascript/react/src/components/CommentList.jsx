import React from 'react'

const CommentList = ({comments}) => {
  return(
    <div>
      { comments.map((comment) =>
        <div className="comment" key={comment.id}>
          <p dangerouslySetInnerHTML={{ __html: comment.content }}>
          </p>
        </div>
      )}
    </div>
  )
}

export default CommentList