import React, {Component} from 'react'
import {getBoardById, getBoard, editBoard} from '../../redux/actions/BoardActions'
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar'
import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EditBoard extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: 0,
      idPrice: '',
      schedule: '',
      seat: '',
      start: false,
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.submitData = async (e)=>{
      e.preventDefault()
      const id = this.props.match.params.id
      const data = {
        idPrice: this.state.idPrice,
        schedule: this.state.schedule,
        seat: this.state.seat
      }
      this.props.editBoard(id, data)
      this.props.history.push('/dashboard')      
    }
  }
  async componentDidMount(){
    const id = this.props.match.params.id
    this.props.getBoardById(id)
    
    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/price')
    }
  }
  componentDidUpdate() {
    if (this.props.board && !this.state.start) {
      this.setState({
        idPrice: this.props.board[0].id_price,
        schedule: this.props.board[0].schedule.slice(0, 10),
        seat: this.props.board[0].seat,
        start: true
      })
    }
  }
  render(){
    return(
        <>
          <Row>
            <Sidebar />
            <Col md={4} />
            <Col md={3}>
              <Form className='mt-2' onSubmit={this.submitData}>
                <h2 className='text-dark text-center font-weight-bold'>Update Schedule</h2>
                <FormGroup>
                  <Label>id Price</Label>
                  <Input type='text'  
                    value={this.state.idPrice} 
                    onChange={(e) => this.setState({idPrice: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Schedule</Label>
                  <Input type='date' 
                    value={this.state.schedule} 
                    onChange={(e) => this.setState({schedule: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Seat</Label>
                  <Input type='text'  
                    value={this.state.seat} 
                    onChange={(e) => this.setState({seat: e.target.value})} />
                </FormGroup>
                <Button style={{float: "right"}} color='success'>Save</Button>
              </Form>
            </Col>
          </Row>
        </>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board.boards.data
  }
}

export default connect(mapStateToProps, {getBoardById, getBoard, editBoard})(EditBoard)