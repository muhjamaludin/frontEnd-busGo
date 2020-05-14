import React, { Component } from 'react'
import config from '../../utils/config'
import axios from 'axios'
import Sidebar from '../../components/Sidebar'
import {getUsers, deleteUser} from '../../redux/actions/userActions'
import {connect} from 'react-redux'
import Config from '../../utils/config'

import {
  Table, Button,
  Row, Col, Form, FormGroup,
  Input, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { MdDeleteForever } from 'react-icons/md'
import { FaEdit, FaEye, FaSort } from 'react-icons/fa'
import '../../styles/search.css'

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
      page: 1,
      limit: 5,
      searchKey: 'username',
      sortKey: 'username',
      searchValue: '',
      sortValue: 0,
      currentPage: 1,
      sort: 0,
      Profile: '',
      showModal: false,
      selectedId: 0,
      startFrom: 1
    }
    this.limit = (e) => {
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('limit', this.state.limit)
      this.props.getUsers(page, limit, searchKey, searchValue, sortKey, sortValue)
    }

    this.nextData = () => {
      this.setState({page: this.state.page + 1, startFrom: this.state.startFrom + this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.props.getUsers(page + 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.prevData = () => {
      this.setState({page: this.state.page - 1, startFrom: this.state.startFrom - this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.props.getUsers(page - 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.searchUser = async (e) => {
      this.setState({searchValue: e.target.value})
      const {page, limit, searchKey, sortKey, sortValue} = this.state
      this.props.getUsers(page, limit, searchKey, e.target.value, sortKey || 'username', sortValue)
    }
    this.sort = async () => {
      if (this.state.sortValue === 1) {
        this.setState({sortValue: 0})
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        this.props.getUsers(page, limit, searchKey, searchValue, sortKey, sortValue)
      } else {
        this.setState({sortValue: 1})
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        this.props.getUsers(page, limit, searchKey, searchValue, sortKey, sortValue)
      }
    }
    this.deleteData = async () => {
      const id = this.state.selectedId
      this.props.deleteUser(id)
      this.props.getUsers(1, 5, this.state.searchKey || 'price', this.state.searchValue || '', this.state.sortKey || 'price', this.state.sortValue || '')
      this.setState({showModal: false})
    }
  }
  async componentDidMount() {
    this.props.getUsers(1, 5, this.state.searchKey || 'price', this.state.searchValue || '', this.state.sortKey || 'price', this.state.sortValue || 0)
  }

  render() {
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1}></Col>
          <Col md={9} className="mt-4" >
            <Form>
              <FormGroup>
                <table>
                  <tr>
                    <td>
                      <div className='searchbar'>
                        <i class="fas fa-search"></i>
                        <Input type='search' placeholder='input your name' onChange={this.searchUser} />
                      </div>
                    </td>
                    <td>
                      <select onChange={(e)=>this.setState({searchKey: e.target.value})} >
                        <option>Username</option>
                        <option>Fullname</option>
                        <option>Phone</option>
                      </select>
                    </td>
                    <td>
                      <select onChange={(e)=> this.setState({sortKey: e.target.value})}>
                        <option>Username</option>
                        <option>Fullname</option>
                        <option>Phone</option>
                      </select>
                      <FaSort color={'#053354'} size={23} onClick={this.sort} />
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
                <td>{this.state.startFrom + i}</td>
                <td>{this.props.user[i].username}</td>
                <td>{this.props.user[i].fullname}</td>
                <td>{this.props.user[i].identity}</td>
                <td> 0{this.props.user[i].phone} </td>
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
                        email: this.props.user[i].email,
                        address: this.props.user[i].address,
                        balance: this.props.user[i].balance,
                        })} />
                  {/* </Link> */}
                  <Link to={`/users/userdetail/${this.props.user[i].id}`}>
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
        <Row>
        <Col md={2} className='text-center'>
            <Button disabled={this.props.page.prevLink ? false : true} onClick={this.prevData} className='previous'>&#8249;</Button>
          </Col>
          <Col md={5} className='text-center'>
            <Button disabled={this.props.page.nextLink ? false : true} onClick={this.nextData} className='next'>&#8250;</Button>
          </Col>
          <Col md={2}>
                <label>Limit</label>
                <select value={this.state.limit} onChange={(e) => this.setState({limit: e.target.value})}>
                  <option value="5" onClick={this.limit} >5</option>
                  <option value="10" onClick={this.limit} >10</option>
                  <option value="25" onClick={this.limit} >25</option>
                  <option value="50" onClick={this.limit} >50</option>
                  <option value="100" onClick={this.limit} >100</option>
                </select>
              </Col>
          <Col md={3} className='text-right'>
            Page {this.props.page.page}/{this.props.page.totalPage} Total Data {this.props.page.totalData} Limit {this.props.page.perPage}
          </Col>
        </Row>
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
                      <Col md={4}>Email:</Col>
                      <Col md={6}> {this.state.email} </Col>
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
          <ModalBody>Are you sure want to delete user?</ModalBody>
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

export default connect(mapStateToProps, {getUsers, deleteUser})(Users)