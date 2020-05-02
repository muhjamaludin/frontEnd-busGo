import React, { Component } from 'react'
import config from '../../utils/config'
import axios from 'axios'
import Sidebar from '../../components/Sidebar'
import {getUsers} from '../../redux/actions/userActions'
import {connect} from 'react-redux'

import {
  Table, Container, Button,
  Row, Col, Form, FormGroup,
  Label, Input, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { MdDeleteForever } from 'react-icons/md'
import { FaEdit, FaEye } from 'react-icons/fa'
import '../../styles/search.css'

import { Link } from 'react-router-dom'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
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
      showModal: false,
      selectedId: 0,
      startFrom: 1
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
    const results = await axios.get(config.APP_BACKEND.concat('users'))
    const { data } = results.data
    const { pageInfo } = results.data
    this.setState({ users: data, pageInfo })
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
                    <td style={{ width: '80%' }}>
                      <div className='searchbar'>
                        <i class="fas fa-search"></i>
                        <Input type='search' placeholder='input your name' onChange={this.searchUser} />
                      </div>
                    </td>
                    {/* <td className='text-right'>
                      <Link to='/agents/add'><button type='submit' className='btn btn-success buttonAdd'> Add User</button></Link>
                    </td> */}
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
                  <Link style={{ marginRight: '40px', color: 'black' }} to={`/user/userdetail/${this.props.user[i].id}`}>
                    <FaEye />
                  </Link>
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
        <Row>
        <Col md={3} className='text-center'>
            <Button disabled={this.props.page.prevLink ? false : true} onClick={this.prevData} className='previous'>&#8249;</Button>
          </Col>
          <Col md={6} className='text-center'>
            <Button disabled={this.props.page.nextLink ? false : true} onClick={this.nextData} className='next'>&#8250;</Button>
          </Col>
          <Col md={3} className='text-right'>
            Page {this.props.page.page}/{this.props.page.totalPage} Total Data {this.props.page.totalData} Limit {this.props.page.perPage}
          </Col>
        </Row>
        {/* <Modal isOpen={this.state.showModal}>
          <ModalHeader>Delete User</ModalHeader>
          <ModalBody>Are u sure want to delete user?</ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.deleteData}>OK</Button>
            <Button color='danger' onClick={() => this.setState({ showModal: false, selectedId: 0 })}>Cancel</Button>
          </ModalFooter>
        </Modal> */}
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