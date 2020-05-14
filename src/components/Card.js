import React, { Component } from 'react'
import { Col, Row, Card as CardData } from 'reactstrap'

import {getBusses} from '../redux/actions/busActions'
import {getRoutes} from '../redux/actions/routeActions'
import {getBoard} from '../redux/actions/BoardActions'
import {getAgents} from '../redux/actions/agentActions'

import {connect} from 'react-redux'

import '../styles/card.css'
import { MdSchedule } from 'react-icons/md'
import { FaBus, FaRoute, FaUserTie } from 'react-icons/fa'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalSchedule: '',
      totalAgents: '',
    }
  }

  async componentDidMount() {
    this.props.getBusses(1, 50, 'bus_name', '', 'bus_name', '')
    this.props.getRoutes(1, 5, '', '', 'departure', '')
    this.props.getBoard(1, 5, 'schedule', '', 'schedule', '')
    this.props.getAgents(1, 5, 'name', '', 'name', '')
  }

  render() {
    console.log('get', this.props.board)
    return (
      <Row className='rowCard'>
        <Col md={3}>
          <CardData className='sizeCard bus'>
            <FaBus className='icon' /> {this.props.bus.totalData} buses
          </CardData>
        </Col>
        <Col md={3}>
          <CardData className='sizeCard route'>
            <FaRoute className='icon' /> {this.props.route.totalData} Routes
          </CardData>
        </Col>
        <Col md={3}>
          <CardData className='sizeCard agent'>
            <FaUserTie className='icon' /> {this.props.agen.totalData} Agents
          </CardData>
        </Col>
        <Col md={3}>
          <CardData className='sizeCard schedule'>
            <MdSchedule className='icon' /> {this.props.board ? this.props.board.totalData : ''} Schedules
          </CardData>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    bus: state.bus.pageInfo,
    route: state.route.pageInfo,
    board: state.board.boards.pageInfo,
    agen: state.agents.pageInfo
  }
}

export default connect(mapStateToProps, {getBusses, getRoutes, getBoard, getAgents})(Card)
