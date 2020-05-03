import React, {Component} from 'react'
import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import {addSchedules} from '../../redux/actions/scheduleActions'
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar'

class CreateSchedule extends Component{
  constructor(props){
    super(props)
    this.state = {
      timeGo: '',
      arrive: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.submitData = async (e) => {
      e.preventDefault()
      // this.setState({isLoading: true})
      console.log(this.state)
      const data = {
        departure: this.state.timeGo,
        arrive: this.state.arrive
      }
      this.props.addSchedules(data)
      this.props.history.push('/schedule')
    }
      this.dismissModal = () => {
        this.setState({showModal: false})
        this.props.history.push('/schedule')
      }
  }
    
  render(){
    return(
        <>
          <Row>
            <Sidebar />
            <Col md={3}></Col>
            <Col md={5}>
              <Form className='mt-2' onSubmit={e=>this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>Update Schedule</h2>
                <FormGroup>
                  <Label>Time Go</Label>
                  <Input type='text' 
                    placeholder={'time to go'} 
                    value={this.state.timeGo} 
                    onChange={(e) => this.setState({timeGo: e.target.value})} 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Arrive</Label>
                  <Input type='text' placeholder={this.state.arrive} 
                  value={this.state.arrive} 
                  onChange={(e) => this.setState({arrive: e.target.value})} />
                </FormGroup>
                <Button  color='success'>Save</Button>
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

export default connect(null, {addSchedules})(CreateSchedule)