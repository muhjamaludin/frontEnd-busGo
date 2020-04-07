import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import config from '../../utils/config'
import { editAgent } from '../../redux/actions/agentActions'

import qs from 'qs'

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
      idUser: '',
      name: '',
      data: {},
      isLoading: false,
      showModal: false,
      modalMessage: '',
    }
  }
  componentDidMount() {
    const results = this.props.agents
    const data = results.data
    console.log(this.state)
    this.setState({ id: this.props.match.params.id, data })
    // const data = results.data
    // this.setState({ id: this.props.match.params.id, data })
    // console.log(agent)
    this.changeData = (e, form) => {
      const { data } = this.state
      data[form] = e.target.value
      this.setState({ data })
    }
    this.submitData = async (e) => {
      e.preventDefault()
      // this.setState({isLoading: true})
      const submit = this.props.editAgent
      if (submit.data.success) {
        this.setState({ isLoading: false })
        this.props.history.push('/agents')
      } else {
        this.setState({ modalMessage: submit.data.msg })
      }
    }
    this.dismissModal = () => {
      this.setState({ showModal: false })
      this.props.history.push('/agents')
    }
  }

  render() {
    const { id, isLoading } = this.state
    const { idUser, name } = this.state.data
    console.log(this.state)
    return (
      <Container>
        {isLoading && <>Loading...</>}
        {
          <>
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Alert</ModalHeader>
              <ModalBody>{this.state.modalMessage}</ModalBody>
              <ModalFooter>
                <Button onClick={this.dismissModal}>Ok</Button>
              </ModalFooter>
            </Modal>
          </>
        }
        {id && !isLoading && (
          <>
            <Row>
              <Col md={12}>
                <Form className='mt-2' onSubmit={(e) => this.submitData(e)}>
                  <h2 className='text-dark text-center font-weight-bold'>
                    Update Agency
                  </h2>
                  <FormGroup>
                    <Label>id User</Label>
                    <Input
                      type='text'
                      placeholder={this.state.data[0].id_user}
                      value={idUser}
                      onChange={(e) => this.changeData(e, 'idUser')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Bus Name</Label>
                    <Input
                      type='text'
                      placeholder={this.state.data[0].name}
                      value={name}
                      onChange={(e) => this.changeData(e, 'name')}
                    />
                  </FormGroup>
                  <Button color='success'>Save</Button>
                </Form>
              </Col>
            </Row>
          </>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.agents.data.data)
  return {
    agents: state.agents.data,
  }
}

const mapDispatchToProps = { editAgent }

export default connect(mapStateToProps, mapDispatchToProps)(EditAgent)
