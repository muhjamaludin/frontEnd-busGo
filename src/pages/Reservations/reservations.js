import React, { Component } from 'react'
import config from '../../utils/config'
import axios from 'axios'
import { connect } from 'react-redux'
import { getReserve } from '../../redux/actions/reserveActions'

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
import { FaEdit } from 'react-icons/fa'
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
      currentPage: 1,
      sort: 0,
      showModal: false,
      selectedId: 0,
      startFrom: 1,
    }
  }
  componentDidMount() {
    this.props.getReserve()
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
                              placeholder='input your name'
                              onChange={this.searchRoute}
                            />
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
                          <div className='buton'>
                        <td className='text-right'>
                          <Link to='/reserve/add'>
                            <AddButton className='ml-auto' name={'Reservations'} />
                          </Link>
                        </td>
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
                  <th>Bus Seat</th>
                  <th>Departure</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.reservations.data &&
                  this.props.reservations.data.length &&
                  this.props.reservations.data &&
                  this.props.reservations.data.map((data, i) => (
                    <tr className='text-center'>
                      <td>{i + 1}</td>
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
                          to={`/route/${this.props.reservations.data[i].id}`}
                        >
                          <FaEdit />
                        </Link>
                        <button
                          className='buttonDelete'
                          onClick={() =>
                            this.setState({
                              showModal: true,
                              selectedId: this.props.reservations.data[i].id,
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
            {/* <Row>
              <Col md={12} className='text-right'>
                Page {this.props.reservations.pageInfo && this.props.reservations.pageInfo.page}/
                {this.props.reservations.pageInfo && this.props.reservations.pageInfo.totalPage} Total
                Data {this.props.reservations.pageInfo && this.props.reservations.pageInfo.totalData}{' '}
                Limit {this.props.reservations.pageInfo && this.props.reservations.pageInfo.perPage}
              </Col>
            </Row>
            <Row>
              <Col md={6} className='text-center'>
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
              <Col md={6} className='text-center'>
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
            </Row> */}
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete route</ModalHeader>
              <ModalBody>Are u sure want to delete route?</ModalBody>
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

const mapDispatchToProps = { getReserve }

export default connect(mapStateToProps, mapDispatchToProps)(Reserve)
