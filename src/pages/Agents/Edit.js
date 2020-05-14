import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editAgent, getAgentById, getAgents } from '../../redux/actions/agentActions'
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

class EditAgent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      name: '',
      isLoading: false,
      showModal: false,
      modalMessage: '',
      start: false
    }
    this.submitData = async (e) => {
      e.preventDefault()
      // this.setState({isLoading: true})
    const id = this.props.agents[0].id
    console.log(id)
    const data = {
        username: this.state.username,
        name: this.state.name
      }
      const submit = this.props.editAgent(id, data)
      if (submit) {
        this.setState({ isLoading: false })
        this.props.history.push('/agents')
      } else {
        this.setState({ modalMessage: submit.data.msg })
        this.props.history.push('/agents')
      }
    }
    this.dismissModal = () => {
      this.setState({ showModal: false })
      this.props.history.push('/agents')
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getAgentById(id)
  }
  componentDidUpdate() {
    if (this.props.agents && !this.state.start) {
      this.setState({
        username: this.props.agents[0].username,
        name: this.props.agents[0].name,
        start: true
      })
    }
  }

  render() {
    console.log('result', this.props.agents)
    return (
          <>
            <Row>
              <Sidebar />
              <Col md={3} />
              <Col md={5}>
                <Form className='mt-2' onSubmit={(e) => this.submitData(e)}>
                  <h2 className='text-dark text-center font-weight-bold'>
                    Update Agency
                  </h2>
                  <FormGroup>
                    <Label>username</Label>
                    <Input
                      type='text'
                      value={this.state.username} 
                      onChange={((e) => this.setState({username: e.target.value}))}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Agent Name</Label>
                    <Input
                      type='text'
                      value={this.state.name}
                      onChange={(e) => this.setState({name: e.target.value})}
                    />
                  </FormGroup>
                  <Button style={{float: "right"}} color='success'>Save</Button>
                </Form>
              </Col>
            </Row>
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Alert</ModalHeader>
              <ModalBody>{this.state.modalMessage}</ModalBody>
              <ModalFooter>
                <Button onClick={this.dismissModal}>Ok</Button>
              </ModalFooter>
            </Modal>
          </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    agents: state.agents.agents,
    allAgent: state
  }
}

const mapDispatchToProps = { editAgent, getAgentById, getAgents }

export default connect(mapStateToProps, mapDispatchToProps)(EditAgent)
