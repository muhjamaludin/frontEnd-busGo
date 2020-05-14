import React, {Component} from 'react'
import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import {createRoutes} from '../../redux/actions/routeActions'
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar'

class CreateRoute extends Component{
  constructor(props){
    super(props)
    this.state = {
      from: '',
      to: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.submitData = async (e) => {
      e.preventDefault()
      const data = {
        departure: this.state.from,
        destination: this.state.to
      }
      this.props.createRoutes(data)
      this.props.history.push('/route')
    }
      this.dismissModal = () => {
        this.setState({showModal: false})
        this.props.history.push('/route')
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
                <h2 className='text-dark text-center font-weight-bold'>Add Route</h2>
                <FormGroup>
                  <Label>From</Label>
                  <Input type='text' 
                    placeholder={'from'} 
                    value={this.state.from} 
                    onChange={(e) => this.setState({from: e.target.value})} 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>To</Label>
                  <Input type='text' 
                  placeholder={'to'} 
                  value={this.state.to} 
                  onChange={(e) => this.setState({to: e.target.value})} />
                </FormGroup>
                <Button  style={{float: "right"}} color='success'>Save</Button>
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

export default connect(null, {createRoutes})(CreateRoute)