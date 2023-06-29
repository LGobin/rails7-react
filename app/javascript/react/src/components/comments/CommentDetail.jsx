import React, { useState } from 'react'
import TextEditor from '../utilities/TextEditor'

const CommentDetail = ({comment, blockEdit, setBlockEdit}) => {
  const [formErrors, setFormErrors] = useState({})
  const [content, setContent] = useState(comment.content)
  const [tempContent, setTempContent] = useState(comment.content)
  const [edit, setEdit] = useState(false)

  const editMode = () => {
    if(!blockEdit){
      setEdit(true);
      setBlockEdit(true);
    }
  }

  const viewMode = () => {
    setEdit(false);
    setBlockEdit(false);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/comments/${comment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: tempContent }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormErrors({});
        setContent(data.content);
        viewMode();
      } else {
        setFormErrors(data.errors || {});
      }
    } catch (error) {
    }
  }

  return(
    <div>
      { edit ?
        <div>
          <TextEditor attribute={tempContent} setAttribute={setTempContent} />
          {formErrors['content'] && <p className="comment-content-error small text-danger">{formErrors['content']}</p>}
          <button className="submit-comment-button mt-3 btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancel-comment-button mt-3 btn btn-secondary" onClick={() => viewMode()}>
            Cancel
          </button>
        </div> :
        <div className="comment" key={comment.id} onClick={() => editMode()}>
          <p dangerouslySetInnerHTML={{ __html: content }}>
          </p>
        </div>
      }
    </div>
  )
}

export default CommentDetail