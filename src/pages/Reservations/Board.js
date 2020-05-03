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
                        <td style={{ width: '80%' }}>
                          <div className='searchbar'>
                            <i class='fas fa-search'></i>
                            <Input
                              type='search'
                              placeholder='input your name'
                              // onChange={this.searchRoute}
                            />
                          </div>
                        </td>
                        <td className='text-right'>
                          <Link to='/reservations/add'>
                            <AddButton name={'Reservations'} />
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
                      <td>{i + 1}</td>
                      <td>{data.agent}</td>
                      <td>{data.busName}</td>
                      <td>{data.classBus}</td>
                      <td>{data.departure}</td>
                      <td>{data.destination}</td>
                      <td>{data.timeGo}</td>
                      <td>{data.arrive}</td>
                      <td>{data.price}</td>
                      <td>{data.seat}</td>
                      <td>{data.schedule.slice(1, 10)}</td>
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
