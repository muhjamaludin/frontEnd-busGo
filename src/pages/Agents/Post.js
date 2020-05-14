import React, { Component } from 'react'
import { addAgent, getAgents } from '../../redux/actions/agentActions'
import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar'

import {
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
      username: '',
      name: '',
      data: {},
      isLoading: false,
      showModal: false,
      modalMessage: '',
    }
    this.submitData = async (e) => {
      e.preventDefault()
      console.log(this.state)
      this.props.addAgent(this.state.username, this.state.name)
      this.props.history.push('/agents')
      this.props.getAgents(1, 5, 'name', '', 'name', '')
    }
    this.dismissModal = () => {
      this.setState({ showModal: false })
      this.props.history.push('/agents')
    }
  }

  componentDidMount() {
    
  }

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
              <Col md={4} />
              <Col md={5} className="mt-4">
                <Form className='mt-4' onSubmit={(e) => this.submitData(e)}>
                  <h2 className='text-dark text-center font-weight-bold'>
                    New Agency
                  </h2>
                  <div style={{marginTop: '30px'}}>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type='text'
                      value={this.state.username}
                      onChange={(e) => this.setState({ username: e.target.value })}
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
                  </div>
                </Form>
              </Col>
            </Row>
          </>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    agents: state.agents.agents
  }
}

const mapDispatchToProps = { addAgent, getAgents }

export default connect(mapStateToProps, mapDispatchToProps)(PostAgent)
