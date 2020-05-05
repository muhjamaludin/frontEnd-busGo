import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBoard } from '../../redux/actions/BoardActions'

import {
  Table,
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
      value: '',
      page: 1,
      searchKey: '',
      searchValue: '',
      sortKey: '',
      sortValue: '',
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

    this.nextData = () => {
      this.setState({page: this.state.page + 1, startFrom: this.state.startFrom + this.state.pageInfo.perPage })
      const data = {
        page: this.state.page,
      }
      console.log('data', data)
      this.props.getBoard(data)
    }
    this.prevData = () => {
      this.setState({page: this.state.page - 1, startFrom: this.state.startFrom - this.state.pageInfo.perPage})
      const data = {
        page: this.state.page
      }
      this.props.getBoard(data)
    }
    this.sortData = (e) => {
      this.setState({sortValue: 1 ? 0 : 1})
      this.props.getBoard(this.state.sortKey, this.state.sortValue)
      console.log('sort', this.sortKey)
    }
    this.searchData = (e) => {
      this.setState({searchValue: e.target.value})
      this.props.getBoard(this.state.searchKey, this.state.searchValue)
      console.log('data', this.state.searchKey, this.state.searchValue)
    }
  }

  componentDidMount() {
    this.props.getBoard()
  }

  render() {
    console.log('board', this.props.board.data)
    return (
      <>
        <Row>
          <Col md={12}>
            <div style={{ width: '98%'}}>
            <Row>
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
                              value={this.state.searchValue}
                              onChange={this.searchData}
                            />
                          </div>
                        </td>
                        <td>
                          <label>search by</label>
                          <select onChange={(e) => this.setState({searchKey: e.target.value})} >
                            <option value="name">Agent</option>
                            <option value="bus_name">Bus Name</option>
                            <option value="class_bus">Class Bus</option>
                            <option value="departure">Departure</option>
                            <option value="destination">Destination</option>
                            <option value="departure_time">Time Go</option>
                            <option value="arrive_time">Arrive</option>
                            <option value="price">Price</option>
                            <option value="seat">Seat</option>
                            <option value="schedule">Schedule</option>
                          </select>
                        </td>
                        <td>
                          <label>sort by</label>
                          <select onChange={(e) => this.setState({sortKey: e.target.value})} onClick={this.sortData} >
                            <option value="name">Agent</option>
                            <option value="bus_name">Bus Name</option>
                            <option value="class_bus">Class Bus</option>
                            <option value="departure">Departure</option>
                            <option value="destination">Destination</option>
                            <option value="departure_time">Time Go</option>
                            <option value="arrive_time">Arrive</option>
                            <option value="price">Price</option>
                            <option value="seat">Seat</option>
                            <option value="schedule">Schedule</option>
                          </select>
                        </td>
                        <td className='text-right'>
                          <Link to='/reserve/board/add'>
                            <AddButton name={'Add Board'} />
                          </Link>
                        </td>
                      </tr>
                    </table>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Table>
              <thead>
                <tr className='text-center'>
                  <th>No</th>
                  <th>Agent</th>
                  <th>Bus Name</th>
                  <th>Class Bus</th>
                  <th>Departure</th>
                  <th>Destination</th>
                  <th>Time Go</th>
                  <th>Arrive</th>
                  <th>Price</th>
                  <th>Seat</th>
                  <th>Schedule</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.board.data.length && this.props.board.data.map((data, i) => (
                    <tr className='text-center'>
                      <td>{this.state.startFrom + i}</td>
                      <td>{data.agent}</td>
                      <td>{data.busName}</td>
                      <td>{data.classBus}</td>
                      <td>{data.departure}</td>
                      <td>{data.destination}</td>
                      <td>{data.timeGo}</td>
                      <td>{data.arrive}</td>
                      <td>{data.price}</td>
                      <td>{data.seat}</td>
                      <td>{data.schedule.slice(0, 10)}</td>
                      <td>
                        <Link
                          className='buttonEdit'
                          to={`/route/${this.props.board.data[i].id}`}
                        >
                          <FaEdit />
                        </Link>
                        <button
                          className='buttonDelete'
                          onClick={() =>
                            this.setState({
                              showModal: true,
                              selectedId: this.board.reservations.data[i].id,
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
            <Col md={3} className='text-center'>
                <Button
                  disabled={
                    this.props.board.pageInfo && this.props.board.pageInfo.prevLink
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
                    this.props.board.pageInfo && this.props.board.pageInfo.nextLink
                      ? false
                      : true
                  }
                  onClick={this.nextData}
                  className='next'
                >
                  &#8250;
                </Button>
              </Col>
              <Col md={3} className='text-right'>
                Page {this.props.board.pageInfo && this.props.board.pageInfo.page}/
                {this.props.board.pageInfo && this.props.board.pageInfo.totalPage} Total
                Data {this.props.board.pageInfo && this.props.board.pageInfo.totalData}{' '}
                Limit {this.props.board.pageInfo && this.props.board.pageInfo.perPage}
              </Col>
            </Row>
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
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board.boards
  }
}

const mapDispatchToProps = { getBoard }

export default connect(mapStateToProps, mapDispatchToProps)(Reserve)
