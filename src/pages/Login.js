import React, { Component } from 'react'
import {
  Row, Col, Jumbotron, Container,
  Form, FormGroup, Input, Button, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import '../styles/app.css'

import {Link} from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import config from '../utils/config'
import { connect } from 'react-redux'

import {userLoginFetch} from '../redux/actions/actions'


class Login extends Component {
  constructor(props){
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
      this.setState({isLoading:true})
      let params = {
        username: this.state.username,
        password: this.state.password
      }

      const connection = await axios.post(config.APP_BACKEND.concat('auth/login'), params)
      console.log(connection)

      if(connection.data.success){
        setTimeout(()=>{
          this.setState({isLoading: false},()=>{
            localStorage.setItem('token', connection.data.token)
            localStorage.setItem('roleId', connection.data.roleId)
            this.props.check()
            this.props.history.push('/dashboard')
          })
        },1000)
      }else{
        this.setState({showModal: true, isLoading:false})
      }
    }
    this.checkLogin = () => {
      if(localStorage.getItem('token')){
        this.props.history.push('/dashboard')
      }
    }
  }
  componentDidMount(){
    this.checkLogin()
  }
  render() {

    return (
      <>
      <div>
        <Row className='bodyLogin'>
          
          <Container className='container' style={{border: '3px solid blue'}}>
            <Row>
            <Col md={5} className='loginRight'> Namaste
            </Col>
              <Col md={7}>
             <Form className='loginPage' onSubmit={e=>this.onLogin(e)}>             
            Sign Up
              <FormGroup>
                <Label className='text-left'>Username</Label>
                <input type="text" className="form-control username" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=> this.setUsername(e)} />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type='password' className="form-control username" placeholder='Password' onChange={(e)=> this.setPassword(e,)} />
              </FormGroup>
              <Row>
                <Col md={12} className='text-center'>
                  <Button type='submit' className='buttonSignIn' >Sign In</Button>
                </Col>
              </Row>
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
          <Button autoFocus onClick={()=>this.setState({showModal: false})} color='primary'>OK</Button>
        </ModalFooter>
      </Modal>
      {this.state.isLoading && (<Loading/>)}
      </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Login)