import React, { useState } from 'react'
import CommentList from './CommentList'
import NewComment from './NewComment'

const QuestionDetail = ({ question, setSelectedQuestion }) => {
  const [comments, setComments] = useState(question.comments)
  const [likeCount, setLikeCount] = useState(question.likes_count);
  const [dislikeCount, setDislikeCount] = useState(question.dislikes_count);

  const increaseLikeCounter = () => {
    setLikeCount((prevCount) => prevCount + 1);
    updateQuestionCounter({ count: 'like' });
  };

  const increaseDislikeCounter = () => {
    setDislikeCount((prevCount) => prevCount + 1);
    updateQuestionCounter({ count: 'dislike' });
  };

  const handleQuestionClick = () => {
    setSelectedQuestion(question);
  };

  const updateQuestionCounter = (data) => {
    fetch(`http://localhost:3000/api/v1/questions/${question.id}/update_counter`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card rounded-0 mt-3">
      <div className="card-body">
        <h3 onClick={handleQuestionClick} className="card-title clickable-header" data-bs-toggle="modal" data-bs-target="#editQuestionModal">
          {question.title}
        </h3>
        <p className="lead">
          <span className="badge bg-primary mx-1">{question.tag}</span>
        </p>
        <button
          type="button"
          className="btn btn-primary position-relative"
          onClick={increaseLikeCounter}
          style={{ marginRight: '1em' }}
        >
          Like
          {likeCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              {likeCount}
            </span>
          )}
        </button>
        <button
          type="button"
          className="btn btn-danger position-relative"
          onClick={increaseDislikeCounter}
        >
          Dislike
          {dislikeCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {dislikeCount}
            </span>
          )}
        </button>
        <CommentList comments={comments} />
        <NewComment question={question} comments={comments} setComments={setComments} />
      </div>
    </div>
  );
};

export default QuestionDetail;
