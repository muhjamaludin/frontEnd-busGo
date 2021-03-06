import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import Reservations from './Reservations/reservations'

// styles
import '../styles/app.css'
import { Col, Row } from 'reactstrap'
import { Chart } from 'react-charts'
import Board from './Reservations/Board'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.checkToken = () => {
      if (!localStorage.getItem('token')) {
        alert('You must login first')
        props.history.push('/login')
      }
    }
  }

  componentDidMount() {
    this.checkToken()
  }

  render() {
    return (
      <div>
        <Row>
          <Sidebar />
          <Col md={11}>
            <Card />
            <Row className='mt-2'>
              <Col md={12}>
                <Board />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard
