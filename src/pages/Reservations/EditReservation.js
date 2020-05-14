import React, { Component } from 'react'
import axios from 'axios'
import config from '../../utils/config'
import Sidebar from '../../components/Sidebar'
import {getReserveById, editReserve} from '../../redux/actions/reserveActions'
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

class EditReserve extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      idUser: '',
      idPrice: '',
      idBoard: '',
      seat: '',
      status: '',
      start: false,
      isLoading: false,
      showModal: false,
      modalMessage: '',
    }
    this.submitData = async (e) => {
      e.preventDefault()
      // this.setState({isLoading: true})
      const id = this.props.match.params.id
      const data = {
        idUser: this.state.idUser,
        idPrice: this.state.idPrice,
        idBoard: this.state.idBoard,
        seat: this.state.seat,
        status: this.state.status
      }
      this.props.editReserve(id, data)
      this.props.history.push('/reserve')
    }

    this.dismissModal = () => {
      this.setState({ showModal: false })
      this.props.history.push('/bus')
    }
  
  }
  
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getReserveById(id)
    
  }

  componentDidUpdate() {
    if (this.props.reservation && !this.state.start) {
      this.setState({
        idUser: this.props.reservation[0].id_user,
        idPrice: this.props.reservation[0].id_price,
        idBoard: this.props.reservation[0].id_board,
        seat: this.props.reservation[0].seat,
        status: this.props.reservation[0].status,
        start: true
      })
    }
  }
    
    
  render() {
    console.log('reservation', this.props.reservation)
    console.log('update', this.state.idUser, this.state.idPrice)
    return (
          <>
            <Row>
              <Sidebar />
              <Col md={3} />
              <Col md={4}>
                
                <Form className='mt-2' onSubmit={(e) => this.submitData(e)}>
                  <h2 className='text-dark text-center font-weight-bold'>
                    Update Reservation
                  </h2> 
                  <FormGroup>
                      <Label>id User</Label>
                      <Input type='text' value={this.state.idUser} onChange={(e) => this.setState({idUser: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                      <Label>id Price</Label>
                      <Input type='text' value={this.state.idPrice} onChange={(e) => this.setState({idPrice: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                      <Label>id Board</Label>
                      <Input type='text' value={this.state.idBoard} onChange={(e) => this.setState({idBoard: e.target.value})} />
                    </FormGroup>  
                    <FormGroup>
                      <Label>Seat</Label>
                      <Input type='text' value={this.state.seat} onChange={(e) => this.setState({seat: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                      <div>
                      <Label>Status</Label>
                      </div>
                      <Input type='text' value={this.state.status} onChange={(e) => this.setState({status: e.target.value})} />
                    </FormGroup>
                      <Button color='success'>Save</Button>
                </Form>
              </Col>
            </Row>
          </>
    )
  }
}

const mapStateToProps = state => {
  return {
    reservation: state.reserve.reservations.data
  }
}

export default connect(mapStateToProps, {getReserveById, editReserve})(EditReserve)
