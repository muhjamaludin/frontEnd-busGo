import React, { Component } from 'react'
import { Col, Row, Card as CardData } from 'reactstrap'
import axios from 'axios'
import config from '../utils/config'

import '../styles/card.css'
import { MdSchedule } from 'react-icons/md'
import { FaBus, FaRoute, FaUserTie } from 'react-icons/fa'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalBus: '',
      totalRoute: '',
      totalSchedule: '',
      totalAgents: '',
    }
    this.checkData = () => {
      this.props.checkData()
    }
  }

  async componentDidMount() {
    const totalDataBus = await axios.get(config.APP_BACKEND.concat('bus'))
    const totalBus = ''
    this.setState({ totalBus: totalDataBus.data.pageInfo.totalData })
    const totalDataRoute = await axios.get(config.APP_BACKEND.concat('route'))
    const totalRoute = ''
    this.setState({ totalRoute: totalDataRoute.data.pageInfo.totalData })
    const totalDataSchedule = await axios.get(
      config.APP_BACKEND.concat('schedule')
    )
    const totalSchedule = ''
    this.setState({ totalSchedule: totalDataSchedule.data.pageInfo.totalData })
    const totalDataAgents = await axios.get(config.APP_BACKEND.concat('agents'))
    const totalAgents = ''
    this.setState({ totalAgents: totalDataSchedule.data.pageInfo.totalData })
  }

  render() {
    return (
      <Row className='mt-2 rowCard'>
        <Col md={3}>
          <CardData className='bg-light bus'>
            <FaBus /> {this.state.totalBus} buses
          </CardData>
        </Col>
        <Col md={3}>
          <CardData className='bg-light route'>
            <FaRoute /> {this.state.totalRoute} Routes
          </CardData>
        </Col>
        <Col md={3}>
          <CardData className='agent'>
            <FaUserTie /> {this.state.totalAgents} Agents
          </CardData>
        </Col>
        <Col md={3}>
          <CardData className='schedule'>
            <MdSchedule /> {this.state.totalSchedule} Schedules
          </CardData>
        </Col>
      </Row>
    )
  }
}

export default Card
