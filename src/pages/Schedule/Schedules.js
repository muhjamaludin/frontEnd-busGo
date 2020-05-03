import React, { Component } from 'react'
import config from '../../utils/config'
import axios from 'axios'
import { getSchedules } from '../../redux/actions/scheduleActions'
import { connect } from 'react-redux'

import {
  Table,
  Container,
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

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedules: [],
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

    this.nextData = async () => {
      const results = await axios.get(this.state.pageInfo.nextLink)
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({
        schedules: data,
        pageInfo,
        startFrom: this.state.startFrom + pageInfo.perPage,
      })
    }
    this.prevData = async () => {
      const results = await axios.get(this.state.pageInfo.prevLink)
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({
        schedules: data,
        pageInfo,
        startFrom: this.state.startFrom - pageInfo.perPage,
      })
    }
    this.searchSchedule = async (e) => {
      const results = await axios.get(
        config.APP_BACKEND.concat(
          `schedule?search[departure_time]=${e.target.value}`
        )
      )
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({ schedules: data, pageInfo })
    }
    this.sortSchedule = async () => {
      this.setState({ sort: this.state.sort ? '' : 1 })
      const results = await axios.get(
        config.APP_BACKEND.concat(`schedule?sort[schedule]=${this.state.sort}`)
      )
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({ schedules: data, pageInfo })
    }
    this.deleteData = async () => {
      const results = await axios.delete(
        config.APP_BACKEND.concat(`schedule/${this.state.selectedId}`)
      )
      if (results.data.success) {
        console.log('test')
        const newData = await axios.get(config.APP_BACKEND.concat('schedule'))
        const { data } = newData.data
        const { pageInfo } = newData.data
        this.setState({
          schedules: data,
          pageInfo,
          showModal: false,
          selectedId: 0,
        })
      } else {
        console.log(results.data)
      }
    }
  }
  componentDidMount() {
    this.props.getSchedules()
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
                              placeholder='input your schedule'
                              onChange={this.searchSchedule}
                            />
                          </div>
                        </td>
                        <td>
                            <label></label>
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
                        <td className='text-right'>
                          <Link to='/schedule/add'>
                            <button
                              type='submit'
                              className='btn btn-success buttonAdd'
                            >
                              {' '}
                              Add Schedule
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
                  <th onClick={this.sortSchedule}>Time Go</th>
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
                      <td>{1 + i}</td>
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
                              selectedId: this.state.schedules[i].id,
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
            <Col md={3} className='text-center' style={{height: '10%'}}>
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
              <Col md={6} className='text-center'>
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
              <Col md={3} className='text-right'>
                Page {this.props.pageInfo && this.props.pageInfo.page}/
                {this.props.pageInfo && this.props.pageInfo.totalPage} Total
                Data {this.props && this.props.pageInfo.totalData} Limit{' '}
                {this.props && this.props.pageInfo.perPage}
              </Col>
            </Row>
            
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete Schedule</ModalHeader>
              <ModalBody>Are u sure want to delete schedule?</ModalBody>
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

const mapDispatchToProps = { getSchedules }

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
