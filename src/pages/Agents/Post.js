import React, { Component } from 'react'
import axios from 'axios'
import config from '../../utils/config'
import { addAgent } from '../../redux/actions/agentActions'
import { connect } from 'react-redux'

import qs from 'qs'
import Sidebar from '../../components/Sidebar'

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

class PostAgent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idUser: '',
      name: '',
      data: {},
      isLoading: false,
      showModal: false,
      modalMessage: '',
    }
    this.submitData = async (e) => {
      e.preventDefault()
      // this.setState({isLoading: true})
      console.log(this.state)
      this.props.addAgent(this.state.idUser, this.state.name)
      this.props.history.push('/agents')
    }
    this.dismissModal = () => {
      this.setState({ showModal: false })
      this.props.history.push('/agents')
    }
  }
  //   async componentDidMount(){
  //     const results = await axios.get(config.APP_BACKEND.concat(`agents/add`))
  //     const {data} = results.data
  //     this.setState({id:this.props.match.params.id, data})
  //     console.log(data)
  //     this.changeData = (e, form) => {
  //       const {data} = this.state
  //       data[form] = e.target.value
  //       this.setState({data})
  //     }}

  render() {
    return (
      <Row>
        <Sidebar />
        <Col md={10}>
          <>
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Alert</ModalHeader>
              <ModalBody>{this.state.modalMessage}</ModalBody>
              <ModalFooter>
                <Button onClick={this.dismissModal}>Ok</Button>
              </ModalFooter>
            </Modal>
          </>

          <>
            <Row>
              <Col md={12}>
                <Form className='mt-2' onSubmit={(e) => this.submitData(e)}>
                  <h2 className='text-dark text-center font-weight-bold'>
                    New Agency
                  </h2>
                  <FormGroup>
                    <Label>id User</Label>
                    <Input
                      type='number'
                      value={this.state.idUser}
                      onChange={(e) =>
                        this.setState({ idUser: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Agency Name</Label>
                    <Input
                      type='text'
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </FormGroup>
                  <Button color='success'>Save</Button>
                </Form>
              </Col>
            </Row>
          </>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addagents: state.agents.data,
  }
}

const mapDispatchToProps = { addAgent }

export default connect(mapStateToProps, mapDispatchToProps)(PostAgent)
