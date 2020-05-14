import React, {Component} from 'react'
import axios from 'axios'
import config from '../../utils/config'
import {addPrice} from '../../redux/actions/priceActions'
import {connect} from 'react-redux'
import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import '../../styles/input.css'
import Sidebar from '../../components/Sidebar'

class PostPrice extends Component{
  constructor(props){
    super(props)
    this.state = {
      idPrice: '',
      idRoute: '',
      idBus: '',
      idSchedule: '',
      price: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }

    this.submitData = async (e)=>{
        e.preventDefault()
        const data = {
          idBus: this.state.idBus,
          price: this.state.price
        }
        this.props.addPrice(data)
        this.props.history.push('/price')
    }
    


    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/price')
    }
  }
    async componentDidMount () {
      const bus = await axios.get(config.APP_BACKEND.concat(`bus`))
      this.setState({buses: bus.data})
  }

  render(){

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
                <h2 className='text-dark text-center font-weight-bold'>New Price</h2>
                <FormGroup>
                  <Label className='numberInput'>id Bus</Label>
                  <Input type='number' value={this.state.idBus} onChange={((e) => this.setState({idBus: e.target.value}))} />
                </FormGroup>
                <FormGroup>
                  <Label>Price</Label>
                  <Input type='text' value={this.state.price} onChange={(e) => this.setState({price: e.target.value})} />
                </FormGroup>
                <Button type='submit' color='success'>Save</Button>
              </Form>
            </Col>
          </Row>
        </>
      
    
    )
  }
}

export default connect(null, {addPrice})(PostPrice)