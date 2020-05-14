import React, {Component} from 'react'
import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import {addBoard} from '../../redux/actions/reserveActions'
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar'

class CreateBoard extends Component{
  constructor(props){
    super(props)
    this.state = {
      idPrice: '',
      seat: '',
      schedule: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.submitData = async (e) => {
      e.preventDefault()
      console.log(this.state)
      const data = {
        idPrice: this.state.idPrice,
        schedule: this.state.schedule,
        seat: this.state.seat,
      }
      console.log('data', data)
      this.props.addBoard(data)
      this.props.history.push('/dashboard')
    }
      this.dismissModal = () => {
        this.setState({showModal: false})
        this.props.history.push('/dashboard')
      }
  }
    
  render(){
    return(
        <>
          <Row>
            <Sidebar />
            <Col md={3}></Col>
            <Col md={5} >
              <Form className='mt-2' onSubmit={e=>this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>Add New Board</h2>
                <FormGroup>
                  <Label>id Price</Label>
                  <Input type='number' 
                  placeholder={'id price'}
                  value={this.state.idPrice} 
                  onChange={(e) => this.setState({idPrice: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Schedulue</Label>
                  <Input type='date' 
                  placeholder={Date.now()}
                  value={this.state.schedule} 
                  onChange={(e) => this.setState({schedule: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Seat</Label>
                  <Input type='number' 
                  placeholder={'amount seat'}
                  value={this.state.seat} 
                  onChange={(e) => this.setState({seat: e.target.value})} />
                </FormGroup>
                <div>
                  <Button style={{float: "right"}} color='success'>Save</Button>
                </div>
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

export default connect(null, {addBoard})(CreateBoard)