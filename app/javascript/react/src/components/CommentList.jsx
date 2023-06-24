import React from 'react'

const CommentList = ({comments}) => {
  return(
    <div>
      { comments.map((comment) =>
        <div className="comment">
          <p className>
            {comment.content}
          </p>
        </div>
      )}
    </div>
  )
}

export default CommentList