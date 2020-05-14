import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getReserve, deleteReservation } from '../../redux/actions/reserveActions'

import {
  Table,
  Container,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import { FaEdit, FaSort } from 'react-icons/fa'
import AddButton from '../../components/Button'

class Reserve extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: [],
      pageInfo: {
        page: 0,
        perPage: 0,
        totalData: 0,
        totalPage: 0,
        nextLink: null,
        prevLink: null,
      },
      page: 1,
      limit: 5,
      searchKey: 'status',
      sortKey: 'username',
      searchValue: '',
      sortValue: 0,
      currentPage: 1,
      sort: 0,
      showModal: false,
      selectedId: 0,
      startFrom: 1,
    }
    this.limit = (e) => {
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('limit', this.state.limit)
      this.props.getReserve(page, limit, searchKey, searchValue, sortKey, sortValue)
    }

    this.nextData = () => {
      this.setState({page: this.state.page + 1, startFrom: this.state.startFrom + this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.props.getReserve(page + 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.prevData = () => {
      this.setState({page: this.state.page - 1, startFrom: this.state.startFrom - this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.props.getReserve(page - 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.searchReserve = async (e) => {
      this.setState({searchValue: e.target.value})
      const {page, limit, searchKey, sortKey, sortValue} = this.state
      this.props.getReserve(page, limit, searchKey, e.target.value, sortKey || 'username', sortValue)
    }
    this.sort = async () => {
      if (this.state.sortValue === 1) {
        this.setState({sortValue: 0})
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        this.props.getReserve(page, limit, searchKey, searchValue, sortKey, sortValue)
      } else {
        this.setState({sortValue: 1})
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        this.props.getReserve(page, limit, searchKey, searchValue, sortKey, sortValue)
      }
    }
    this.deleteData = async () => {
      const id = this.state.selectedId
      this.props.deleteUser(id)
      this.props.getReserve(1, 5, this.state.searchKey || 'status', this.state.searchValue || '', this.state.sortKey || 'status', this.state.sortValue || '')
      this.setState({showModal: false})
    }
  }
  componentDidMount() {
    this.props.getReserve(1, 5,'status', this.state.searchValue || '', this.state.sortKey || 'status', this.state.sortValue || 0)
  }

  render() {
    console.log('dangdut', this.props.reservations.data)
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1} />
          <Col md={9}>
            <Row className='mt-4'>
              <Col md={12}>
                <Form>
                  <FormGroup>
                    <table style={{ width: '100%' }}>
                      <tr>
                        <td style={{ width: '40%' }}>
                          <div className='searchbar'>
                            <i class='fas fa-search'></i>
                            <Input
                              type='search'
                              placeholder='input your search'
                              onChange={this.searchReserve}
                            />
                          </div>
                        </td>
                        <td>
                          <label>Search By</label>
                        <select onChange={(e) => this.setState({searchKey: e.target.value})}>
                              <option value="status">Status</option>
                              <option value="username">Username</option>
                              <option value="fullname">Fullname</option>
                              <option value="bus_name">Bus Name</option>
                              <option value="departure">Departure</option>
                              <option value="destination">Destination</option>
                            </select>
                          </td>
                          <td>
                            <label>Sort By</label>
                            <select onChange={(e) => this.setState({sortKey: e.target.value})}>
                              <option value="username">Username</option>
                              <option value="fullname">Fullname</option>
                              <option value="bus_name">Bus Name</option>
                              <option value="departure">Departure</option>
                              <option value="destination">Destination</option>
                              <option value="status">Status</option>
                            </select>
                            <FaSort color={'#053354'} size={23} onClick={this.sort} />
                          </td>
                          <div className='buton'>
                        {/* <td className='text-right'>
                          <Link to='/reserve/add'>
                            <AddButton className='ml-auto' name={'Reservations'} />
                          </Link>
                        </td> */}
                        </div>
                      </tr>
                    </table>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Table>
              <thead className='thead-dark'>
                <tr className='text-center'>
                  <th>No</th>
                  <th onClick={this.sortRoute}>Username</th>
                  <th>Full Name</th>
                  <th>Bus Name</th>
                  <th>Class Bus</th>
                  <th>No Seat</th>
                  <th>Departure</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th style={{width: 150}}>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.reservations.data &&
                  this.props.reservations.data.length &&
                  this.props.reservations.data &&
                  this.props.reservations.data.map((data, i) => (
                    <tr className='text-center'>
                      <td>{i + this.state.startFrom}</td>
                      <td>{data.username}</td>
                      <td>{data.fullname}</td>
                      <td>{data.busName}</td>
                      <td>{data.classBus}</td>
                      <td>{data.seat}</td>
                      <td>{data.departure}</td>
                      <td>{data.destination}</td>
                      <td>{data.statusBoard}</td>
                      <td>
                        <Link
                          className='buttonEdit'
                          to={`/reserve/${data.id}`}
                        >
                          <FaEdit />
                        </Link>
                        <button
                          className='buttonDelete'
                          onClick={() =>
                            this.setState({
                              showModal: true,
                              selectedId: data.id,
                            })
                          }
                        >
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Row>
            <Col md={2} className='text-center'>
                <Button
                  disabled={
                    this.props.reservations.pageInfo && this.props.reservations.pageInfo.prevLink
                      ? false
                      : true
                  }
                  onClick={this.prevData}
                  className='previous'
                >
                  &#8249;
                </Button>
              </Col>
              <Col md={5} className='text-center'>
                <Button
                  disabled={
                    this.props.reservations.pageInfo && this.props.reservations.pageInfo.nextLink
                      ? false
                      : true
                  }
                  onClick={this.nextData}
                  className='next'
                >
                  &#8250;
                </Button>
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
                Page {this.props.reservations.pageInfo && this.props.reservations.pageInfo.page}/
                {this.props.reservations.pageInfo && this.props.reservations.pageInfo.totalPage} Total
                Data {this.props.reservations.pageInfo && this.props.reservations.pageInfo.totalData}{' '}
                Limit {this.props.reservations.pageInfo && this.props.reservations.pageInfo.perPage}
              </Col>
            </Row>
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete Reservation ?</ModalHeader>
              <ModalBody>Are you sure want to delete this reservation?</ModalBody>
              <ModalFooter>
                <Button color='success' onClick={this.deleteData}>
                  OK
                </Button>
                <Button
                  color='danger'
                  onClick={() =>
                    this.setState({ showModal: false, selectedId: 0 })
                  }
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    reservations: state.reserve.reservations
  }
}

const mapDispatchToProps = { getReserve, deleteReservation }

export default connect(mapStateToProps, mapDispatchToProps)(Reserve)
