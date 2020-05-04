import React, {Component} from 'react'
import {getRoutesById, editRoutes} from '../../redux/actions/routeActions'
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar'

import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EditRoute extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: 0,
      departure: '',
      destination: '',
      isLoading: false,
      showModal: false,
      modalMessage: '',
      dataRoutesById: {}
    }
    this.submitData = async (e)=>{
      e.preventDefault()
      const data = {
        departure: this.state.departure,
        destination: this.state.destination
      }
      const id = this.props.match.params.id
      this.props.editRoutes(id, data)
      console.log('masa', id, data)
        this.props.history.push('/route')
    }
  }
  componentDidMount(){
    const id = this.props.match.params.id
    this.props.getRoutesById(id)
    }
  render(){
    console.log('ini', this.props)
    return(
        <>
          <Row>
            <Sidebar />
            <Col md={3} />
            <Col md={5}>
              <Form className='mt-2' onSubmit={e=>this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>Update Schedule</h2>
                <FormGroup>
                  <Label>Departure</Label>
                  <Input 
                    type='text' 
                    // placeholder={this.props.route.data[0].departure} 
                    value={this.state.departure} 
                    onChange={(e) => this.setState({departure: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Destination</Label>
                  <Input 
                    type='text' 
                    // placeholder={this.props.route.data[0].destination} 
                    value={this.state.destination} 
                    onChange={(e) => this.setState({destination: e.target.value})} />
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
    route: state.route.routes
  }
}

export default connect(mapStateToProps, {getRoutesById, editRoutes})(EditRoute)