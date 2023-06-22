import * as React from 'react'
import * as ReactDOM from 'react-dom'

const QuestionTag = (props) => {
  return(
    <span className="badge bg-primary mx-1">
      {props.tag.name}
    </span>
  )
}

export default QuestionTag