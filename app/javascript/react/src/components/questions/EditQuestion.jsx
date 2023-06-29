import React, { useState, useRef } from 'react';

const EditQuestion = (props) => {
  const questionTags = [
    { label: 'Ruby', value: 0 },
    { label: 'React', value: 1 },
    { label: 'Rails', value: 2 },
    { label: 'Bootstrap', value: 3 },
    { label: 'Javascript', value: 4 },
  ];

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState(questionTags[0].value);
  const [formErrors, setFormErrors] = useState({});
  const closeButtonRef = useRef(null);
  const [questionCreated, setQuestionCreated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('blank')

  const updateFormParams = () => {
    setTitle(props.selectedQuestion.title);
    setTag(questionTags.find(tag => tag.label === props.selectedQuestion.tag).value)
    setCurrentQuestion(props.selectedQuestion)
  }

  if(props.selectedQuestion != '' && currentQuestion != props.selectedQuestion){
    updateFormParams();
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagChange = (e) => {
    setTag(questionTags[e.target.value].value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/v1/questions/${props.selectedQuestion.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, tag: questionTags[tag].label }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormErrors({});
        setQuestionCreated(true);

        setTimeout(() => {
          closeButtonRef.current.click();
          resetForm();
          props.fetchQuestionList();
        }, 1000);
      } else {
        setFormErrors(data.errors || {});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setTag(questionTags[0].value);
    setQuestionCreated(false);
  };

  return (
    <div>
      <div className="modal" id="editQuestionModal" tabIndex="-1" aria-labelledby="editQuestionModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editQuestionModalLabel">
                Edit Question
              </h5>
              <button ref={closeButtonRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {questionCreated ? (
                <h4 className="mt-3 mb-3">Question updated successfully!</h4>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="form-floating" htmlFor="title">
                      Title:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                    />
                    {formErrors['title'] && <p className="small text-danger">{formErrors['title']}</p>}
                  </div>
                  <div>
                    <label className="form-floating mt-3" htmlFor="tag">
                      Tag:
                    </label>
                    <select className="form-select" id="tag" value={tag} onChange={handleTagChange}>
                      {questionTags.map((tag) => (
                        <option key={tag.value} value={tag.value}>
                          {tag.label}
                        </option>
                      ))}
                    </select>
                    {formErrors['tag'] && <p className="small text-danger">{formErrors['tag']}</p>}
                  </div>
                  <button className="mt-5 btn btn-primary" type="submit">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
