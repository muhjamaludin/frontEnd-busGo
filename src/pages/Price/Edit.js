import React, {Component} from 'react'
import {getPricesById, editPrice} from '../../redux/actions/priceActions'
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar'
import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EditPrice extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: 0,
      idBus: '',
      price: '',
      start: false,
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.submitData = async (e)=>{
      e.preventDefault()
      const id = this.props.match.params.id
      const data = {
        idBus: this.state.idBus,
        price: this.state.price
      }
      this.props.editPrice(id, data)
      this.props.history.push('/price')      
    }
  }
  async componentDidMount(){
    const id = this.props.match.params.id
    this.props.getPricesById(id)
    
    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/price')
    }
  }
  componentDidUpdate() {
    if (this.props.price && !this.state.start) {
      this.setState({
        idBus: this.props.price[0].id_bus,
        price: this.props.price[0].price,
        start: true
      })
    }
  }
  render(){
    console.log('props', this.props.price)
    return(
        <>
          <Row>
            <Sidebar />
            <Col md={4} />
            <Col md={3}>
              <Form className='mt-2' onSubmit={this.submitData}>
                <h2 className='text-dark text-center font-weight-bold'>Update Price</h2>
                <FormGroup>
                  <Label>id Bus</Label>
                  <Input type='text'  
                    value={this.state.idBus} 
                    onChange={(e) => this.setState({idBus: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Price</Label>
                  <Input type='text'  
                    value={this.state.price} 
                    onChange={(e) => this.setState({price: e.target.value})} />
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
    price: state.price.prices.data
  }
}

export default connect(mapStateToProps, {getPricesById, editPrice})(EditPrice)