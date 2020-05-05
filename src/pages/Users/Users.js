import React, { Component } from 'react'
import config from '../../utils/config'
import axios from 'axios'
import Sidebar from '../../components/Sidebar'
import {getUsers} from '../../redux/actions/userActions'
import {connect} from 'react-redux'
import Config from '../../utils/config'

import {
  Table, Container, Button,
  Row, Col, Form, FormGroup,
  Label, Input, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { MdDeleteForever } from 'react-icons/md'
import { FaEdit, FaEye } from 'react-icons/fa'
import '../../styles/search.css'
import {Profile} from './UserDetail'
import {BusDetail} from '../buses/BusDetail'

import { Link } from 'react-router-dom'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      picture: '',
      username: '',
      fullname: '',
      identity: '',
      gender: '',
      phone: '',
      address: '',
      balance: '',
      pageInfo: {
        page: 0,
        perPage: 0,
        totalData: 0,
        totalPage: 0,
        nextLink: null,
        prevLink: null
      },
      currentPage: 1,
      sort: 0,
      Profile: '',
      showModal: false,
      selectedId: 0,
      startFrom: 1
    }
    this.Profile = async () => {

    }

    this.nextData = async () => {
      const results = await axios.get(this.state.pageInfo.nextLink)
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({ users: data, pageInfo, startFrom: this.state.startFrom + pageInfo.perPage })
    }
    this.prevData = async () => {
      const results = await axios.get(this.state.pageInfo.prevLink)
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({ users: data, pageInfo, startFrom: this.state.startFrom - pageInfo.perPage })
    }
    this.searchUser = async (e) => {
      const results = await axios.get(config.APP_BACKEND.concat(`users?search[username]=${e.target.value}`))
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({ users: data, pageInfo })
    }
    this.sortUser = async () => {
      this.setState({ sort: (this.state.sort ? '' : 1) })
      const results = await axios.get(config.APP_BACKEND.concat(`users?sort[username]=${this.state.sort}`))
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({ users: data, pageInfo })
    }
    this.deleteData = async () => {
      const results = await axios.delete(config.APP_BACKEND.concat(`users/${this.state.selectedId}`))
      if (results.data.success) {
        console.log('test')
        const newData = await axios.get(config.APP_BACKEND.concat('users'))
        const { data } = newData.data
        const { pageInfo } = newData.data
        this.setState({ users: data, pageInfo, showModal: false, selectedId: 0 })
      } else {
        console.log(results.data)
      }
    }
  }
  async componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1}></Col>
          <Col md={9} className="mt-4" >
            <Form style={{ width: '70%' }}>
              <FormGroup>
                <table style={{ width: '100%' }}>
                  <tr>
                    <td>
                      <div className='searchbar'>
                        <i class="fas fa-search"></i>
                        <Input type='search' placeholder='input your name' onChange={this.searchUser} />
                      </div>
                    </td>
                    <td>
                            <select>
                              <option>search by</option>
                              <option>username</option>
                              <option>agent</option>
                            </select>
                          </td>
                          <td>
                            <select>
                              <option>sort by</option>
                              <option>username</option>
                              <option>agent</option>
                            </select>
                          </td>
                  </tr>
                </table>
              </FormGroup>
            </Form>
        <Table>
          <thead className="thead-dark">
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Identity</th>
              <th>Phone</th>
              <th>Role id</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.props.user.length && this.props.user.map((v, i) => (
              <tr key={this.props.user[i].id.toString()}>
                <td>{1 + i}</td>
                <td>{this.props.user[i].username}</td>
                <td>{this.props.user[i].fullname}</td>
                <td>{this.props.user[i].identity}</td>
                <td> {this.props.user[i].phone} </td>
                <td> {this.props.user[i].role_id} </td>
                <td>
                  {/* <Link style={{ marginRight: '40px', color: 'black' }} to={`/user/userdetail/${this.props.user[i].id}`}> */}
                    <FaEye style={{ marginRight: '40px', color: 'black' }} 
                      onClick={() => this.setState({
                        Profile: true,
                        picture: this.props.user[i].profile_picture,
                        username: this.props.user[i].username,
                        fullname: this.props.user[i].fullname,
                        identity: this.props.user[i].identity,
                        gender: this.props.user[i].gender,
                        phone: this.props.user[i].phone,
                        address: this.props.user[i].address,
                        balance: this.props.user[i].balance,
                        })} />
                  {/* </Link> */}
                  <Link to={`/user/edit/${this.props.user[i].id}`}>
                    <FaEdit color={'blue'} />
                  </Link>
                  <Button className='buttonDelete' onClick={() => this.setState({ showModal: true, selectedId: this.props.user[i].id })}>
                    <MdDeleteForever />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Row>
        <Col md={3} className='text-center'>
            <Button disabled={this.props.page.prevLink ? false : true} onClick={this.prevData} className='previous'>&#8249;</Button>
          </Col>
          <Col md={6} className='text-center'>
            <Button disabled={this.props.page.nextLink ? false : true} onClick={this.nextData} className='next'>&#8250;</Button>
          </Col>
          <Col md={3} className='text-right'>
            Page {this.props.page.page}/{this.props.page.totalPage} Total Data {this.props.page.totalData} Limit {this.props.page.perPage}
          </Col>
        </Row> */}
        <Modal className='modal-lg' isOpen={this.state.Profile}>
          <ModalHeader>Profile</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={2} />
              <Col md={8} >
                <Row>
                  <Col md={6}>
                    <Row>
                        Profile picture:
                    </Row>
                    <Row>
                    <img src={Config.APP_BACKEND.concat(`profile/${this.state.picture}`)} width={200} height={200} alt={this.state.picture} />
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={4}>Username:</Col>
                      <Col md={8}> {this.state.username} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Fullname:</Col>
                      <Col md={6}> {this.state.fullname} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Identity:</Col>
                      <Col md={6}> {this.state.identity} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Gender:</Col>
                      <Col md={6}> {this.state.gender} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Phone:</Col>
                      <Col md={6}> {this.state.phone} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Address:</Col>
                      <Col md={6}> {this.state.address} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Balance:</Col>
                      <Col md={6}> {this.state.balance} </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={() => this.setState({ Profile: false})}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showModal}>
          <ModalHeader>Delete User</ModalHeader>
          <ModalBody>Are u sure want to delete user?</ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.deleteData}>OK</Button>
            <Button color='danger' onClick={() => this.setState({ showModal: false, selectedId: 0 })}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.users,
    page: state.user.pageInfo
  }
}

export default connect(mapStateToProps, {getUsers})(Users)