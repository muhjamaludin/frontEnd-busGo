import React, { Component } from 'react'
import {
  Row, Col, Jumbotron, Container,
  Form, FormGroup, Input, Button, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import '../styles/app.css'

import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import config from '../utils/config'
import { connect } from 'react-redux'

import { setLogin } from '../redux/actions/AuthActions'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      showModal: false,
      isLoading: false
    }
    this.setUsername = (e) => {
      this.setState({
        username: e.target.value
      })
    }
    this.setPassword = (e) => {
      this.setState({
        password: e.target.value
      })
    }
    // this.onFormChange = (e,form) => {
    //   this.setState({[form]:e.target.value})
    // }
    this.onLogin = async (e) => {
      e.preventDefault()
      this.setState({ isLoading: true })
      let params = {
        username: this.state.username,
        password: this.state.password
      }
      this.props.setLogin(params).then( () => {
        if(localStorage.getItem('token')) {
          this.props.history.push('/dashboard')
        } else {
          this.setState({ showModal: true, isLoading: false })
        }
      })
    }
    this.checkLogin = () => {
      if (localStorage.getItem('token')) {
        this.props.history.push('/dashboard')
      }
    }
  }
  componentDidMount() {
    this.checkLogin()
  }
  render() {

    return (
      <>
        <div>
          <Row className='bodyLogin'>

            <Container className='container'>
              <Row className='double'>
                <Col md={5} className='loginRight'>
                  <div className='wrapRight'>
                    <p className='loginRightOne'>#First</p>
                    <p className='loginRightTwo'>Go Inside</p>
                    <p className='loginRightThree'>Get In for preference settings</p>
                  </div>
                </Col>
                <Col md={0.5}>
                  <div className='triangle'></div>
                </Col>
                <Col md={6.5}>
                  <Form className='loginPage' onSubmit={e => this.onLogin(e)}>
                    <span className='spanSignIn'>Sign In</span>
                    <div className='loginInput'>
                      <FormGroup>
                        <Label className='text-left'></Label>
                        <input type="text" className="form-control username" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => this.setUsername(e)} />
                      </FormGroup>
                      <FormGroup>
                        <Label></Label>
                        <Input type='password' className="form-control username" placeholder='Password' onChange={(e) => this.setPassword(e)} />
                      </FormGroup>
                      <Row>
                        <Col md={12} className='text-center'>
                          <Button type='submit' className='buttonSignIn' >Sign In</Button>
                        </Col>
                      </Row>
                    </div>
                    <Row>
                      <Col md={12} className='text-center mt-2'></Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Row>

          <Modal isOpen={this.state.showModal}>
            <ModalHeader>Warning</ModalHeader>
            <ModalBody>
              Wrong Username or Password
        </ModalBody>
            <ModalFooter>
              <Button autoFocus onClick={() => this.setState({ showModal: false })} color='primary'>OK</Button>
            </ModalFooter>
          </Modal>
          {this.state.isLoading && (<Loading />)}
        </div>
      </>
    )
  }
}



export default connect(null, {setLogin})(Login)