import React, { useState } from 'react'
import CommentDetail from './CommentDetail'

const CommentList = ({comments}) => {
  const [blockEdit, setBlockEdit] = useState(false);
  return(
    <div>
      { comments.map((comment) =>
        <div key={comment.id}>
          <CommentDetail comment={comment} blockEdit={blockEdit} setBlockEdit={setBlockEdit} />
        </div>
      )}
    </div>
  )
}

export default CommentList