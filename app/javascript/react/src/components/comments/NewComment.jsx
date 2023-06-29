import React, { useState } from 'react'
import TextEditor from '../utilities/TextEditor'

const NewComment = ({question, comments, setComments}) => {
  const [content, setContent] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content, question_id: question.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments(comments.concat(data))
        setFormErrors({});
        resetForm();
      } else {
        setFormErrors(data.errors || {});
      }
    } catch (error) {
    }
  }

  const resetForm = () => {
    setContent('');
  };

  return(
    <div>
      <p className="leave-comment fw-bold">Leave a comment</p>
      <TextEditor attribute={content} setAttribute={setContent}/>
      {formErrors['content'] && <p className="comment-content-error small text-danger">{formErrors['content']}</p>}
      <button className="submit-comment-button mt-3 btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default NewComment