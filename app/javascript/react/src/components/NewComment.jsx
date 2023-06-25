import React, { useState } from 'react'
import TextEditor from './TextEditor'

const NewComment = () => {
  return(
    <div>
      <p className="leave-comment fw-bold">Leave a comment</p>
      <TextEditor />
    </div>
  )
}

export default NewComment