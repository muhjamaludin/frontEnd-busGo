import React, {Component} from 'react'
import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import {addReserve} from '../../redux/actions/reserveActions'
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar'

class CreateReservation extends Component{
  constructor(props){
    super(props)
    this.state = {
      idUser: '',
      idPrice: '',
      idBoard: '',
      seat: '',
      status: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.submitData = async (e) => {
      e.preventDefault()
      // this.setState({isLoading: true})
      console.log(this.state)
      const data = {
        idUser: this.state.idUser,
        idPrice: this.state.idPrice,
        idBoard: this.state.idBoard,
        seat: this.state.seat,
        status: this.state.status
      }
      this.props.addReserve(data)
      this.props.history.push('/reserve')
    }
      this.dismissModal = () => {
        this.setState({showModal: false})
        this.props.history.push('/reserve')
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
                <h2 className='text-dark text-center font-weight-bold'>Add Reservation</h2>
                <FormGroup>
                  <Label>id User</Label>
                  <Input type='number' 
                    placeholder={'id user'} 
                    value={this.state.idUser} 
                    onChange={(e) => this.setState({idUser: e.target.value})} 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>id Price</Label>
                  <Input type='number' 
                  placeholder={'id price'}
                  value={this.state.idPrice} 
                  onChange={(e) => this.setState({idPrice: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>id Board</Label>
                  <Input type='number' 
                  placeholder={'id board'}
                  value={this.state.idBoard} 
                  onChange={(e) => this.setState({idBoard: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Seat</Label>
                  <Input type='number' 
                  placeholder={'seat'}
                  value={this.state.seat} 
                  onChange={(e) => this.setState({seat: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Status</Label>
                  <Input type='text' 
                  placeholder={'status'}
                  value={this.state.status} 
                  onChange={(e) => this.setState({status: e.target.value})} />
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

export default connect(null, {addReserve})(CreateReservation)