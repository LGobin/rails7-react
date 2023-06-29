import * as React from 'react'
import { useState, useEffect } from 'react'
import QuestionDetail from './QuestionDetail'
import EmptyQuestionMessage from './EmptyQuestionMessage'
import Spinner from '../Spinner'
import NewQuestion from '../comments/NewQuestion'
import EditQuestion from './EditQuestion'
import Pagination from '../utilities/Pagination'

const QuestionList = () => {

  const questionTags = [
    { label: 'All', value: 0 },
    { label: 'Ruby', value: 1 },
    { label: 'React', value: 2 },
    { label: 'Rails', value: 3 },
    { label: 'Bootstrap', value: 4 },
    { label: 'Javascript', value: 5 }
  ]

  const [questionsList, setQuestionsList] = useState([])
  const [selectedOption, setSelectedOption] = useState(questionTags[0].value)
  const [showAlert, setShowAlert] = useState(false)
  const [showSpinner, setShowSpinner] = useState(true)
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [currentItems, setCurrentItems] = useState([]);

  const questionsUrl = 'http://localhost:3000/api/v1/questions'

  const fetchQuestionList = () => {
    fetch(questionsUrl)
      .then((response) => response.json())
      .then((data) => {
        setQuestionsList(data)
        setShowSpinner(false)
        setCurrentItems(data.slice(0, 10))
      })
  }
  
  useEffect(() => {
    fetchQuestionList()
  }, [])

  const updateSelectedItem = (event) => {
    setQuestionsList([])
    setShowSpinner(true)
    setShowAlert(false)
    setSelectedOption(event.target.value)

    fetch(questionsUrl + `?tags=${questionTags[event.target.value].label}&search=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      setQuestionsList(data)
      setShowSpinner(false)
      if(data.length == 0) {
        setShowAlert(true)
      }
    })
  }

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setQuestionsList([])
    setShowSpinner(true)
    setShowAlert(false)

    fetch(questionsUrl + `?tags=${questionTags[selectedOption].label}&search=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      setQuestionsList(data)
      setShowSpinner(false)
      if(data.length == 0) {
        setShowAlert(true)
      }
    })
  }

  return(
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className='row'>
          <div className="col-8">
            <p className="lead fw-bold">Search by title</p>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </form>
          </div>
          <div className="col-4">
            <p className="lead fw-bold"> Filter by Tags</p>
            <select className="form-select form-select-lg" value={selectedOption} onChange={event => updateSelectedItem(event)}>
              {questionTags.map(tag => (
                <option key={tag.value} value={tag.value}>
                  {tag.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <NewQuestion />
        <EditQuestion selectedQuestion={selectedQuestion} fetchQuestionList={fetchQuestionList}/>
        <Pagination setCurrentItems={setCurrentItems} questionsList={questionsList} />
        { questionsList.length > 0 ?
          currentItems.map((question) =>
            <QuestionDetail question={question} key={question.id} setSelectedQuestion={setSelectedQuestion} />
          ) : <Spinner showSpinner={showSpinner}/> 
        }
        { showAlert && <EmptyQuestionMessage tagname={selectedOption.label} /> }
      </div>
    </div>
  )
}

export default QuestionList