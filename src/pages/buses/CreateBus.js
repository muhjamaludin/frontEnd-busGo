import React, {Component} from 'react'
import {getAgents} from '../../redux/actions/agentActions'
import {getRoutes} from '../../redux/actions/routeActions'
import {getSchedules} from '../../redux/actions/scheduleActions'
import {addBus} from '../../redux/actions/busActions'
import {connect} from 'react-redux'

import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import '../../styles/input.css'
import Sidebar from '../../components/Sidebar'

class CreateBus extends Component{
  constructor(props){
    super(props)
    this.state = {
      picture: '',
      idAgent: '',
      idRoute: '',
      idSchedule: '',
      busName: '', 
      classBus: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.file = React.createRef()

    this.submitData = async (e)=>{
      e.preventDefault()
      console.log('files upload', this.file.current)
      // this.setState({isLoading: true})
      let bodyFormData = new FormData()
      bodyFormData.append('idAgent', this.state.idAgent)
      bodyFormData.append('idBusRoute', this.state.idRoute)
      bodyFormData.append('idBusSchedule', this.state.idSchedule)
      bodyFormData.append('picture', this.state.picture)
      bodyFormData.append('busName', this.state.busName)
      bodyFormData.append('classBus', this.state.classBus)

      console.log('isi state', this.state.idAgent, this.state.idRoute, this.state.idSchedule, this.state.busName, this.state.classBus)
      console.log('amerika', bodyFormData)
      this.props.addBus(bodyFormData)
      // this.setState({isLoading: false})
      this.props.history.push('/bus')
    }

    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/bus')
    }
  }
    async componentDidMount () {
      this.props.getAgents()
  }

  render(){
      console.log('ini dul', this.state.picture)
    return(
      
        <>
          <Modal isOpen={this.state.showModal}>
            <ModalHeader>Alert</ModalHeader>
            <ModalBody>
                {this.state.modalMessage}
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.dismissModal}>Ok</Button>
            </ModalFooter>
          </Modal>
          <Row>
          <Sidebar />
          <Col md={3} />
            <Col md={5}>
              <Form className='mt-2' onSubmit={(e) => this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>New Bus</h2>
              <FormGroup>
                  <Label>Picture</Label>
                  <Input type='file' ref={this.file} onChange={(e) => this.setState({picture: e.target.files[0]})} />
                </FormGroup>
                <FormGroup>
                <Label>Agent</Label>
                    <select className='form-control' value={this.state.value} onChange={(e) => this.setState({idAgent: e.target.value})} >
                  {this.props.agent.length && this.props.agent.map((data, i) => (
                      <option value={data.id}>{data.name}</option>
                  ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label >Route</Label>
                  <select className='form-control' value={this.state.value} onChange={(e) => this.setState({idRoute: e.target.value})} >
                    {this.props.routes && this.props.routes.map((data, i) => (
                        <option value={data.id}>{data.departure} - {data.destination}</option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label >Schedule</Label>
                  <select className='form-control' value={this.state.value} onChange={(e) => this.setState({idSchedule: e.target.value})} >
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
                  <Label>Class Bus</Label>
                  <Input type='text' value={this.state.classBus} onChange={(e) => this.setState({classBus: e.target.value})} />
                </FormGroup>
                
                <Button type='submit' style={{float: 'right'}} color='success'>Save</Button>
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
    schedules: state.schedule.schedules
  }
}

export default connect(mapStateToProps, {getAgents, getRoutes, getSchedules, addBus})(CreateBus)