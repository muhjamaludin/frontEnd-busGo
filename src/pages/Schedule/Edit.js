import React, {Component} from 'react'
import {getScheduleById, editSchedule} from '../../redux/actions/scheduleActions'
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
import Config from '../../utils/config'

import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EditSchedule extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: 0,
      timeGo: '',
      arrive: '',
      start: false,
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.submitData = async (e)=>{
      e.preventDefault()
      const data = {
        departure: this.state.timeGo,
        arrive: this.state.arrive
      }
      const id = this.props.match.params.id
      this.props.editSchedule(id, data)
      console.log('masa', id, data)
      this.props.history.push('/schedule')
    }
  }
  componentDidMount(){
    const id = this.props.match.params.id
    this.props.getScheduleById(id)
  
    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/schedule')
    }
  }
  componentDidUpdate() {
    if (this.props.schedule && !this.state.start) {
      this.setState({
        timeGo: this.props.schedule.data[0].departure_time,
        arrive: this.props.schedule.data[0].arrive_time,
        start: true
      })
    }
  }
  render(){
    console.log(this.props.schedule)
    return(
        <>
          <Row>
            <Sidebar />
            <Col md={3} />
            <Col md={5}>
              <Form className='mt-2' onSubmit={e=>this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>Update Time</h2>
                <FormGroup>
                  <Label>Time Go</Label>
                  <Input 
                    type='time' 
                    value={this.state.timeGo} 
                    onChange={(e) => this.setState({timeGo: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Arrive</Label>
                  <Input 
                    type='time' 
                    value={this.state.arrive} 
                    onChange={(e) => this.setState({arrive: e.target.value})} />
                </FormGroup>
                <Button style={{float: "right"}} color='success'>Save</Button>
              </Form>
            </Col>
          </Row>
          <Modal isOpen={this.state.showModal}>
            <ModalHeader>Alert</ModalHeader>
            <ModalBody>
                {this.state.modalMessage}
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.dismissModal}>Ok</Button>
            </ModalFooter>
          </Modal>
        </>
    )
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule.schedules
  }
}

export default connect(mapStateToProps, {getScheduleById, editSchedule})(EditSchedule)