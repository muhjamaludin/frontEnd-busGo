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

class PostPrice extends Component{
  constructor(props){
    super(props)
    this.state = {
      routes: [],
      schedules: [],
      buses: [],
      idRoute: '',
      idBus: '',
      idSchedule: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }

    this.submitData = async (e)=>{
        e.preventDefault()
        // this.setState({isLoading: true})
        const submit = await axios.patch(config.APP_BACKEND.concat(`transaction/${this.props.match.params.id}`),qs.stringify(this.state.data))
        console.log(submit.data)
        if(submit.data.success){
          this.setState({isLoading: false})
          this.props.history.push('/transaction')
        }else{
          this.setState({modalMessage: submit.data.msg})
        }
      }
    


    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/transaction')
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
            <Col md={10}>
              <Form className='mt-2' onSubmit={(e) => this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>New Price</h2>
                <FormGroup>
                  <Label>Bus Name</Label>
                  {console.log(this.state.buses.pageInfo)}
                  {/* <select>
                      {this.state.buses && this.state.buses.map((data, i) => (
                        console.log(data.data)
                      ))}
                  </select> */}
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
                  {/* <select className='form-control' >
                    {this.state.routes && this.state.routes.map((data, i) => (
                        <option value={data.id}>{data.departure}</option>
                    ))}
                  </select> */}
                </FormGroup>
                <Button type='submit' color='success'>Save</Button>
              </Form>
            </Col>
          </Row>
        </>
      
    
    )
  }
}

export default PostPrice