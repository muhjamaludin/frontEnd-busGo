import React, {Component} from 'react'
import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import {addReserve, getSeatReservation} from '../../redux/actions/reserveActions'
import {getBoardById} from '../../redux/actions/BoardActions'
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
      const id = this.props.match.params.id
      const data = {
        idUser: this.state.idUser,
        seat: this.state.seat,
        status: this.state.status
      }
      this.props.addReserve(id, data)
      this.props.history.push('/reserve')
    }
      this.dismissModal = () => {
        this.setState({showModal: false})
        this.props.history.push('/reserve')
      }
      this.boardId = async (e) => {
        this.setState({idBoard: e.target.value})
        this.props.getBoardById(e.target.value)
      }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getSeatReservation(id)
    this.props.getBoardById(id)
  }

  buildOptions() {
    var arr = []
    for (let i = 1; i <= parseInt(this.props.board); i++) {
        arr.push(<option key={i} value={i} >{i}</option>) 
    }
    return arr 
  }

  render(){
      console.log('seat', this.props.seat)
      console.log('board', this.props.board)
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
                  <Label>Seat</Label> <br />                
                  <select value={this.state.seat} onChange={(e) => this.setState({seat: e.target.value})} >
                    {this.buildOptions()}
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label>Status</Label> <br />
                  <select value={this.state.status} onChange={(e) => this.setState({status: e.target.value})} >
                      <option value="Booked" > Booked </option>
                      <option value="Booked" > Booked </option>
                      <option value="Paid" > Paid </option>
                      <option value="Boarding" >Boarding</option>
                  </select>
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

const mapStateToProps = state => {
  return {
    seat: state.reserve.reservations.data,
    board: state.board.boards.data[0].seat
  }
}

export default connect(mapStateToProps, {addReserve, getSeatReservation, getBoardById})(CreateReservation)