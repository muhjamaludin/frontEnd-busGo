import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editAgent } from '../../redux/actions/agentActions'
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
    const id = this.props.match.params.id
    const data = results.agents
    console.log('data', data)
    this.setState({ idUser: id, data })
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
      const submit = this.props.editAgent()
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
    const { idUser, name } = this.state
    console.log('result', this.state.data.username)
    return (
          <>
            <Row>
              <Sidebar />
              <Col md={11}>
                <Form className='mt-2' onSubmit={(e) => this.submitData(e)}>
                  <h2 className='text-dark text-center font-weight-bold'>
                    Update Agency
                  </h2>
                  <FormGroup>
                    <Label>username</Label>
                    <Input
                      type='text'
                      placeholder={this.state.data.username}
                      value={this.state.data.username} 
                      onChange={((e) => this.setState({username: e.target.value}))}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Agent Name</Label>
                    <Input
                      type='text'
                      placeholder={this.state.data.name}
                      // value={name}
                      onChange={(e) => this.changeData(e, 'name')}
                    />
                  </FormGroup>
                  <Button color='success'>Save</Button>
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
    agents: state.agents
  }
}

const mapDispatchToProps = { editAgent }

export default connect(mapStateToProps, mapDispatchToProps)(EditAgent)
