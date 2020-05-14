import React, { Component } from 'react'
import config from '../../utils/config'
import axios from 'axios'
import { getSchedules, addSchedules, deleteSchedules } from '../../redux/actions/scheduleActions'
import { connect } from 'react-redux'

import {
  Table,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

import '../../styles/search.css'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { FiEdit, FiSearch } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { FaEdit, FaSort, FaCheck } from 'react-icons/fa'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedules: [],
      searchKey: 'departure_time',
      sortKey: 'departure_time',
      searchValue: '',
      sortValue: '',
      limit: 5,
      page: 1,
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
    this.limit = (e) => {
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('limit', this.state.limit)
      this.props.getSchedules(page, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.nextData = async () => {
      this.setState({page: this.state.page + 1, startFrom: this.state.startFrom + this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('next', this.state.page)
      this.props.getSchedules(page + 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.prevData = async () => {
      this.setState({page: this.state.page - 1, startFrom: this.state.startFrom - this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('next', this.state.page)
      this.props.getSchedules(page - 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.searchSchedule = async (e) => {
      this.setState({searchValue: e.target.value})
      const {page, limit, searchKey, sortKey, sortValue} = this.state
      this.props.getSchedules(page, limit, searchKey, e.target.value, sortKey, sortValue)
    }
    this.sort = async () => {
      if (this.state.sortValue === 1) {
        this.setState({sortValue: 0})
        this.props.getSchedules(this.state.page, this.state.limit, this.state.searchKey, this.state.searchValue, this.state.sortKey, this.state.sortValue)
      } else {
        this.setState({sortValue: 1})
        this.props.getSchedules(this.state.page, this.state.limit, this.state.searchKey, this.state.searchValue, this.state.sortKey, this.state.sortValue)
      }
    }
    this.deleteData = async () => {
      const id = this.state.selectedId
      this.props.deleteSchedules(id)
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.setState({showModal: false})
      console.log('wow', page, limit, searchKey, searchValue, sortKey, sortValue)
      this.props.getSchedules(page || 1, limit || 5, searchKey || '', searchValue || '', sortKey || '', sortValue || '')
    }
  }
  componentDidMount() {
    const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
    this.props.getSchedules(page || 1, limit || 5, searchKey || '', searchValue || '', sortKey || '', sortValue || '')
  }

  render() {
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1}></Col>
          <Col md={9} className="mt-4">
            <Row>
              <Col md={12}>
                <Form>
                  <FormGroup>
                    <table style={{ width: '100%' }}>
                      <tr>
                        <td>
                          <div className='searchbar'>
                            <i class='fas fa-search'></i>
                            <Input
                              type='search'
                              placeholder='input your time'
                              onChange={this.searchSchedule}
                            />
                          </div>
                        </td>
                        <td>
                            <label>Search By</label>
                            <select onChange={(e) => this.setState({searchKey: e.target.value})}>
                              <option value="departure_time" >Time Go</option>
                              <option value="arrive_time" >Arrive</option>
                            </select>
                          </td>
                          <td>
                            <select onChange={(e) => this.setState({sortKey: e.target.value})} >
                              <option value="departure_time" >Time Go</option>
                              <option value="arrive_time" >Arrive</option>
                            </select>
                            <FaSort color={'#053354'} size={23} onClick={this.sort} />
                          </td>
                        <td className='text-right'>
                          <Link to='/schedule/add'>
                            <button
                              type='submit'
                              className='btn btn-success buttonAdd'
                            >
                              {' '}
                              Add Time
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </table>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Table style={{textAlign: 'center'}}>
              <thead className='thead-dark'>
                <tr>
                  <th>No</th>
                  <th >Time Go</th>
                  <th>Time Arrive</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.schedules &&
                  this.props.schedules.length &&
                  this.props.schedules &&
                  this.props.schedules.map((v, i) => (
                    <tr key={this.props.schedules[i].id.toString()}>
                      <td>{i + this.state.startFrom}</td>
                      <td>{this.props.schedules[i].departure_time}</td>
                      <td>{this.props.schedules[i].arrive_time}</td>
                      <td>
                        <Link
                          className='buttonEdit'
                          to={`/schedule/${this.props.schedules[i].id}`}
                        >
                          <FiEdit size={24} />
                        </Link>
                        <button
                          className='buttonDelete'
                          onClick={() =>
                            this.setState({
                              showModal: true,
                              selectedId: this.props.schedules[i].id,
                            })
                          }
                        >
                          <MdDeleteForever size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Row>
            <Col md={2} className='text-center' style={{height: '10%'}}>
                <Button
                  disabled={
                    this.props && this.props.pageInfo.prevLink ? false : true
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
                    this.props && this.props.pageInfo.nextLink ? false : true
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
                Page {this.props.pageInfo && this.props.pageInfo.page}/
                {this.props.pageInfo && this.props.pageInfo.totalPage} Total
                Data {this.props && this.props.pageInfo.totalData} Limit{' '}
                {this.props && this.props.pageInfo.perPage}
              </Col>
            </Row>
            
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete Time</ModalHeader>
              <ModalBody>Are you sure want to delete this time?</ModalBody>
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

const mapStateToProps = (state) => {
  console.log(state)
  return {
    schedules: state.schedule.schedules,
    pageInfo: state.schedule.pageInfo
  }
}

const mapDispatchToProps = { getSchedules, deleteSchedules }

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
