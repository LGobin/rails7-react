import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import QuestionList from './questions/QuestionList'

class Index extends React.Component {
  render() {
    return(
      <div className="container mt-5">
        <QuestionList />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('welcome'))
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
)

export default Index
