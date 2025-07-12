import { useEffect, useState } from 'react'
import { dashboardAPI } from '../api/dashboardAPI'
import { recommendationAPI } from '../api/recommendationAPI'
import './RightNav.css'

function InfoCard({ title, description, show }) {
  return (
    <div className={`info-card${show ? ' info-card-in' : ' info-card-out'}`}>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )
}

const dashboardOptions = [
  { title: 'Dashboard Option 1', description: 'Details for dashboard option 1.' },
  { title: 'Dashboard Option 2', description: 'Details for dashboard option 2.' },
  { title: 'Dashboard Option 3', description: 'Details for dashboard option 3.' },
  { title: 'Dashboard Option 4', description: 'Details for dashboard option 4.' }
]

const recommendationOptions = [
  { title: 'Recommendation 1', description: 'Details for recommendation 1.' },
  { title: 'Recommendation 2', description: 'Details for recommendation 2.' },
  { title: 'Recommendation 3', description: 'Details for recommendation 3.' },
  { title: 'Recommendation 4', description: 'Details for recommendation 4.' }
]

function Dashboard({ sentQuery }) {
  const [selected, setSelected] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sentQuery) {
      setShow(false)
      dashboardAPI(sentQuery).then(val => {
        setSelected(val)
        setTimeout(() => setShow(true), 100)
      })
    }
  }, [sentQuery])

  const option = selected ? dashboardOptions[selected - 1] : null

  return (
    <div>
      <h3>Dashboard</h3>
      {option && <InfoCard title={option.title} description={option.description} show={show} />}
    </div>
  )
}

function Recommendations({ sentQuery }) {
  const [selected, setSelected] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sentQuery) {
      setShow(false)
      recommendationAPI(sentQuery).then(val => {
        setSelected(val)
        setTimeout(() => setShow(true), 100)
      })
    }
  }, [sentQuery])

  const option = selected ? recommendationOptions[selected - 1] : null

  return (
    <div>
      <h3>Recommendations</h3>
      {option && <InfoCard title={option.title} description={option.description} show={show} />}
    </div>
  )
}

function RightNav({ sentQuery }) {
  return (
    <div className="right-nav">
      <Dashboard sentQuery={sentQuery} />
      <Recommendations sentQuery={sentQuery} />
    </div>
  )
}

export default RightNav
