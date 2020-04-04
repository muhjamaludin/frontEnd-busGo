import React, {Component} from 'react'
import axios from 'axios'
import config from '../../utils/config'

import qs from 'qs'

import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import '../../styles/input.css'
import Sidebar from '../../components/Sidebar'

class CreateBus extends Component{
  constructor(props){
    super(props)
    this.state = {
      routes: [],
      picture: '', 
      busName: '', 
      busSeat: '', 
      classBus: '', 
      idRoute: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }

    this.submitData = async (e)=>{
      e.preventDefault()
      // this.setState({isLoading: true})
      var bodyFormData = new FormData()
      bodyFormData.set('busName', this.state.busName)
      bodyFormData.set('busSeat', this.state.busSeat)
      bodyFormData.set('classBus', this.state.classBus)
      bodyFormData.set('idRoute', this.state.idRoute)
      bodyFormData.append('picture', this.state.picture)
      await axios({
        method: 'post',
        url: 'http://localhost:8080/bus/add',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      this.setState({isLoading: false})
      this.props.history.push('/bus')
    }
    


    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/bus')
    }
  }
    async componentDidMount () {
      const results = await axios.get(config.APP_BACKEND.concat(`route`))
      const {data} = results.data
      this.setState({routes:data})
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
            <Col md={10}>
              <Form className='mt-2' onSubmit={(e) => this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>New Bus</h2>
              <FormGroup>
                  <Label>Picture</Label>
                  <Input type='file' value={this.state.picture} onChange={(e) => this.setState({picture: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Bus Name</Label>
                  <Input type='text' value={this.state.busName} onChange={(e) => this.setState({busName: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label className='numberInput'>Bus Seat</Label>
                  <Input type='number' value={this.state.busSeat} onChange={((e) => this.setState({busSeat: e.target.value}))} />
                </FormGroup>
                <FormGroup>
                  <Label>Class Bus</Label>
                  <Input type='text' value={this.state.classBus} onChange={(e) => this.setState({classBus: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label >Route</Label>
                  <select className='form-control' >
                    {this.state.routes && this.state.routes.map((data, i) => (
                        <option value={data.id}>{data.departure}</option>
                    ))}
                  </select>
                </FormGroup>
                <Button type='submit' color='success'>Save</Button>
              </Form>
            </Col>
          </Row>
        </>
      
    
    )
  }
}

export default CreateBus