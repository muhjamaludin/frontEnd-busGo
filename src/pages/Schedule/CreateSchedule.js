import React, {Component} from 'react'
import axios from 'axios'
import config from '../../utils/config'

import qs from 'qs'

import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class CreateSchedule extends Component{
  constructor(props){
    super(props)
    this.state = {
      timeGo: '',
      arrive: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.submitData = async (e)=>{
        e.preventDefault()
        // this.setState({isLoading: true})
        const submit = await axios.patch(config.APP_BACKEND.concat(`schedule/add`),qs.stringify(this.state.data))
        console.log(submit.data)
        if(submit.data.success){
          this.setState({isLoading: false})
          this.props.history.push('/schedule')
        }else{
          this.setState({modalMessage: submit.data.msg})
        }
      }
      this.dismissModal = () => {
        this.setState({showModal: false})
        this.props.history.push('/schedule')
      }
  }
  async componentDidMount(){
    const results = await axios.get(config.APP_BACKEND.concat(`schedule/add`))
    const {data} = results.data
    console.log(data)
    this.setState({id:this.props.match.params.id, data})
    this.changeData = (e, form) => {
      const {data} = this.state
      data[form] = e.target.value 
      this.setState({data})
    }
}

    
  render(){
    return(
        <>
          <Row>
            <Col md={12}>
              <Form className='mt-2' onSubmit={e=>this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>Update Schedule</h2>
                <FormGroup>
                  <Label>Time Go</Label>
                  <Input type='text' 
                    placeholder={'time to go'} 
                    value={this.state.timeGo} 
                    onChange={(e) => this.setState({timeGo: e.target.value})} 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Arrive</Label>
                  <Input type='text' placeholder={this.state.arrive} 
                  value={this.state.arrive} 
                  onChange={(e) => this.setState({arrive: e.target.value})} />
                </FormGroup>
                <Button  color='success'>Save</Button>
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

export default CreateSchedule