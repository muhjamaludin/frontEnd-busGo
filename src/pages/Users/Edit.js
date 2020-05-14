import React, {Component} from 'react'
import {getUsersById, editUser, editRole} from '../../redux/actions/userActions'
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar'

import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EditUser extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: 0,
      timeGo: '',
      arrive: '',
      picture: '',
      username: '',
      fullname: '',
      identity: '',
      gender: '',
      phone: '',
      address: '',
      roleId: '',
      getData: false,
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    this.submitData = async (e)=>{
      e.preventDefault()
      // this.setState({isLoading: true})
      const data = {
        identity: this.state.identity,
        fullname: this.state.fullname,
        gender: this.state.gender,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
      }
      const Role = {
        idUser: this.props.match.params.id,
        RoleId: this.state.roleId
      }
      const id = this.props.match.params.id
      this.props.editUser(id, data)
      this.props.editRole(Role)
      console.log('masa', id, Role)

      this.props.history.push('/users')
    }
  }
  componentDidMount(){
    const id = this.props.match.params.id
    this.props.getUsersById(id)
    
    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/schedule')
    }
  }
  componentDidUpdate() {
    if (this.props.userDetail && !this.state.getData) {
      this.setState({
        username:  this.props.userDetail[0].username,
        fullname:   this.props.userDetail[0].fullname,
        identity:   this.props.userDetail[0].identity,
        gender:   this.props.userDetail[0].gender,
        phone:   this.props.userDetail[0].phone,
        email:   this.props.userDetail[0].email,
        address:   this.props.userDetail[0].address,
        roleId:   this.props.userDetail[0].role_id,
        getData: true
      })
    }
  }

  render(){
    console.log('user detail', this.props.userDetail)
    return(
        <>
          <Row>
            <Sidebar />
            <Col md={3} />
            <Col md={5}>
              <Form className='mt-2' onSubmit={e=>this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>Update User</h2>
                {/* <FormGroup>
                  <Label>Picture</Label>
                  <Input 
                    type='file' 
                    // placeholder={this.props.schedule.arrive_time} 
                    value={this.state.picture} 
                    onChange={(e) => this.setState({picture: e.target.value})} />
                </FormGroup> */}
                <FormGroup>
                  <Input 
                    type='hidden'
                    value={this.state.username} 
                    onChange={(e) => this.setState({username: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Fullname</Label>
                  <Input 
                    type='text' 
                    value={this.state.fullname} 
                    onChange={(e) => this.setState({fullname: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Identity</Label>
                  <Input 
                    type='text'
                    value={this.state.identity} 
                    onChange={(e) => this.setState({identity: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Gender</Label>
                  <Input 
                    type='text'
                    value={this.state.gender} 
                    onChange={(e) => this.setState({gender: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Phone</Label>
                  <Input 
                    type='text' 
                    // placeholder={this.props.userDetail[0].phone} 
                    value={this.state.phone} 
                    onChange={(e) => this.setState({phone: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input 
                    type='text' 
                    // placeholder={this.props.userDetail[0].phone} 
                    value={this.state.email} 
                    onChange={(e) => this.setState({email: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Address</Label>
                  <Input 
                    type='text' 
                    // placeholder={this.props.userDetail[0].address} 
                    value={this.state.address} 
                    onChange={(e) => this.setState({address: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Role Id</Label>
                  <Input 
                    type='text' 
                    // placeholder={this.props.userDetail[0].roleId} 
                    value={this.state.roleId} 
                    onChange={(e) => this.setState({roleId: e.target.value})} />
                </FormGroup>
                <Button style={{float: "right"}} color='success'>Save</Button>
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

const mapStateToProps = state => {
  return {
    userDetail: state.user.users.data
  }
}

export default connect(mapStateToProps, {getUsersById, editUser, editRole})(EditUser)