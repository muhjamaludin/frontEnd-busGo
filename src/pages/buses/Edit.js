import React, { Component } from 'react'
import axios from 'axios'
import config from '../../utils/config'
import Sidebar from '../../components/Sidebar'
import {getBus, editBus} from '../../redux/actions/busActions'
import {getAgents} from '../../redux/actions/agentActions'
import {getSchedules} from '../../redux/actions/scheduleActions'
import {getRoutes} from '../../redux/actions/routeActions'
import {connect} from 'react-redux'
import Config from '../../utils/config'
import {
  Container,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

class EditBus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      idAgent: '',
      idRoute: '',
      idSchedule: '',
      picture: '',
      busName: '',
      classBus: '',
      start: false,
      isLoading: false,
      showModal: false,
      modalMessage: '',
    }
    this.submitData = async (e) => {
      e.preventDefault()
      // this.setState({isLoading: true})
      let bodyFormData = new FormData()
      bodyFormData.append('idAgent', this.state.idAgent)
      bodyFormData.append('idBusRoute', this.state.idRoute)
      bodyFormData.append('idBusSchedule', this.state.idSchedule)
      bodyFormData.append('picture', this.state.picture)
      bodyFormData.append('busName', this.state.busName)
      bodyFormData.append('classBus', this.state.classBus)
      const id = this.props.match.params.id
      this.props.editBus(id, bodyFormData)
      console.log('id', id,  this.state.idAgent, this.state.idRoute, this.state.idSchedule, bodyFormData)
      this.props.history.push('/bus')
    }
    this.picture = (e) => {
      this.setState({
        picture: e.target.files[0]
      })
    }
    this.dismissModal = () => {
      this.setState({ showModal: false })
      this.props.history.push('/bus')
    }
  
  }
  
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getBus(id)
    this.props.getAgents(1, 50, 'name', '', 'name', '')
    this.props.getRoutes(1, 50, 'departure', '', 'departure', '')
    this.props.getSchedules(1, 50, 'departure_time', '', 'departure_time', '')
  }
  
  componentDidUpdate() {
    if (this.props.bus && !this.state.start) {
      this.setState({
        picture: this.props.bus[0].picture,
        idAgent: this.props.bus[0].id_agents,
        idRoute: this.props.bus[0].id_bus_route,
        idSchedule: this.props.bus[0].id_bus_schedule,
        busName: this.props.bus[0].bus_name,
        classBus: this.props.bus[0].class_bus,
        start: true
      })
    }
  }
    
  render() {
    console.log('bus', this.props.bus)
    console.log('name', this.state.busName, this.state.classBus)
    return (
          <>
            <Row>
              <Sidebar />
              <Col md={2} />
              <Col md={8}>
                <Form className='mt-2' onSubmit={(e) => this.submitData(e)}>
                  <h2 className='text-dark text-center font-weight-bold'>
                    Update Bus
                  </h2> 
                  <Row>
                  <Col md={5}>
                      <FormGroup>
                      <Label>Picture</Label> <br />
                      <img src={Config.APP_BACKEND.concat(`bus/${this.state.picture}`)} width={200} height={200} alt='this is for picture' />
                      <Input type='file' onChange={this.picture} />
                      </FormGroup>

                  <Button color='success'>Save</Button>
                  </Col>
                  <Col md={4}>
                      <FormGroup>
                    <Label>Agent</Label>
                        <select className='form-control' value={this.state.idAgent} onChange={(e) => this.setState({idAgent: e.target.value})} >
                      {this.props.agent.length && this.props.agent.map((data, i) => (
                          <option value={data.id}>{data.name}</option>
                      ))}
                      </select>
                    </FormGroup>
                    <FormGroup>
                      <Label >Route</Label>
                      <select className='form-control' value={this.state.idRoute} onChange={(e) => this.setState({idRoute: e.target.value})} >
                        {this.props.routes && this.props.routes.map((data, i) => (
                            <option value={data.id}>{data.departure} - {data.destination}</option>
                        ))}
                      </select>
                    </FormGroup>
                    <FormGroup>
                      <Label >Schedule</Label>
                      <select className='form-control' value={this.state.idSchedule} onChange={(e) => this.setState({idSchedule: e.target.value})} >
                        {this.props.schedules && this.props.schedules.map((data, i) => (
                            <option value={data.id}>{data.departure_time} - {data.arrive_time}</option>
                        ))}
                      </select>
                    </FormGroup>
                    <FormGroup>
                      <Label>Bus Name</Label>
                      <Input type='text' value={this.state.busName} onChange={(e) => this.setState({busName: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                      <div>
                      <Label>Class Bus</Label>
                      </div>
                      <Input type='text' value={this.state.classBus} onChange={(e) => this.setState({classBus: e.target.value})} />
                    </FormGroup>
                  </Col>
                  
                </Row>
                </Form>
              </Col>
            </Row>
          </>
    )
  }
}

const mapStateToProps = state => {
  return {
    agent: state.agents.agents,
    routes: state.route.routes,
    schedules: state.schedule.schedules,
    bus: state.bus.busses
  }
}

export default connect(mapStateToProps, {getBus, getAgents, getRoutes, getSchedules, editBus})(EditBus)
