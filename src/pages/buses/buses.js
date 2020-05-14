import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import config from '../../utils/config'
import {getBusses, deleteBus} from '../../redux/actions/busActions'
import Config from '../../utils/config'

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
  ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap'
import { FiEdit, FiSearch } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import {FaEye, FaSort} from 'react-icons/fa'

import { Link } from 'react-router-dom'
import '../../styles/search.css'
import '../../styles/button.css'
import Sidebar from '../../components/Sidebar'

class Bus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageInfo: {
        page: 0,
        perPage: 0,
        totalData: 0,
        totalPage: 0,
        nextLink: null,
        prevLink: null
      },
      detail: false,
      picture: '',
      name: '',
      busName: '',
      classBus: '',
      departure: '',
      destination: '',
      timeGo: '',
      arrive: '',
      page: 1,
      limit: 5,
      searchKey: 'bus_name',
      sortKey: 'bus_name',
      searchValue: '',
      sortValue: 0,
      currentPage: 1,
      sort: 1,
      showModal: false,
      selectedId: 0,
      startFrom: 1,
      dropDownOpen: false
    }
    this.toggle = (e) => {
      this.setState({dropDownOpen: !this.state.dropDownOpen})
    } 
    this.limit = (e) => {
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('limit', this.state.limit)
      this.props.getBusses(page, limit, searchKey, searchValue, sortKey, sortValue)
    }

    this.nextData = () => {
      this.setState({page: this.state.page + 1, startFrom: this.state.startFrom + this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.props.getBusses(page + 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.prevData = () => {
      this.setState({page: this.state.page - 1, startFrom: this.state.startFrom - this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.props.getBusses(page - 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.searchBus = async (e) => {
      this.setState({searchValue: e.target.value})
      const {page, limit, searchKey, sortKey, sortValue} = this.state
      this.props.getBusses(page, limit, searchKey, e.target.value, sortKey || 'username', sortValue)
    }
    this.sort = async () => {
      if (this.state.sortValue === 1) {
        this.setState({sortValue: 0})
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        this.props.getBusses(page, limit, searchKey, searchValue, sortKey, sortValue)
      } else {
        this.setState({sortValue: 1})
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        this.props.getBusses(page, limit, searchKey, searchValue, sortKey, sortValue)
      }
    }
    this.deleteData = async () => {
      const id = this.state.selectedId
      this.props.deleteBus(id)
      this.props.getBusses(1, 5, this.state.searchKey || 'bus_name', this.state.searchValue || '', this.state.sortKey || 'bus_name', this.state.sortValue || '')
      this.setState({showModal: false})
    }
  }

  async componentDidMount() {
    this.props.getBusses(1, 5, this.state.searchKey || 'bus_name', this.state.searchValue || '', this.state.sortKey || 'bus_name', this.state.sortValue || 0)
  }

  render() {
    console.log('semua bus', this.props.bus)
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1}></Col>
          <Col md={9} className="mt-4" >
            <Row>
              <Col md={12}>
                <Form>
                  <FormGroup>
                    <table style={{width: '100%'}}>
                      <tr>
                        <td>
                          <div className='searchbar'>
                            <Input
                              type='search'
                              placeholder='input your bus'
                              onChange={this.searchBus}
                            />
                          </div>
                        </td>
                        <td>
                            <label></label>
                            <select onChange={(e) => this.setState({searchKey: e.target.value})}>
                              <option value="bus_name" selected>Bus Name</option>
                              <option value="class_bus" >Class Bus</option>
                              <option value="departure" >Departure</option>
                              <option value="destination" >Destination</option>
                              <option value="name" >Agent</option>
                            </select>
                          </td>
                          <td>
                            <select onChange={(e) => this.setState({sortKey: e.target.value})} >
                              <option value="bus_name" >Bus Name</option>
                              <option value="class_bus" >Bus Class</option>
                              <option value="departure" >Departure</option>
                              <option value="destination" >Destination</option>
                              <option value="name" >Agent</option>
                            </select>
                            <FaSort color={'#053354'} size={23} onClick={this.sort} />
                          </td>
                        <td className='text-right'>
                          <Link to='/bus/add'>
                            <button
                              type='submit'
                              className='btn btn-success buttonAdd'
                            >
                              {' '}
                              Add Bus
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
                  <th onClick={this.sortBus}>Bus Name</th>
                  <th>Bus Class</th>
                  <th>Departure</th>
                  <th>Destination</th>
                  <th>Agency</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.bus.busses.length &&
                  this.props.bus.busses.map((v, i) => (
                    <tr key={this.props.bus.busses[i].created_at}>
                      <td>{this.state.startFrom + i}</td>
                      <td>{this.props.bus.busses[i].bus_name}</td>
                      <td>{this.props.bus.busses[i].class_bus}</td>
                      <td>{this.props.bus.busses[i].departure}</td>
                      <td>{this.props.bus.busses[i].destination}</td>
                      <td>{this.props.bus.busses[i].name}</td>
                      <td>
                      {/* <Link  to={`/user/userdetail/`}> */}
                        <FaEye style={{ marginRight: '40px', color: 'black' }} onClick={() => this.setState({
                          detail: true,
                          picture: this.props.bus.busses[i].picture,
                          name: this.props.bus.busses[i].name,
                          busName: this.props.bus.busses[i].bus_name,
                          classBus: this.props.bus.busses[i].class_bus,
                          departure: this.props.bus.busses[i].departure,
                          destination: this.props.bus.busses[i].destination,
                          timeGo: this.props.bus.busses[i].departure_time,
                          arrive: this.props.bus.busses[i].arrive_time
                        })} />
                      {/* </Link> */}
                        <Link
                          className='buttonEdit'
                          to={`/bus/${this.props.bus.busses[i].id}`}
                        >
                          <FiEdit />
                        </Link>
                        <button
                          className='buttonDelete'
                          onClick={() =>
                            this.setState({
                              showModal: true,
                              selectedId: this.props.bus.busses[i].id
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
                  disabled={this.props.bus.pageInfo.prevLink ? false : true}
                  onClick={this.prevData}
                  className='previous'
                >
                  &#8249;
                </Button>
              </Col>
              <Col md={5} className='text-center'>
                <Button
                  disabled={this.props.bus.pageInfo.nextLink ? false : true}
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
              <Col md={3} className='text-right '>
                Page {this.props.bus.pageInfo.page}/{this.props.bus.pageInfo.totalPage}{' '}
                Total Data {this.props.bus.pageInfo.totalData} Limit{' '}
                {this.props.bus.pageInfo.perPage}
              </Col>
            </Row>
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete Bus</ModalHeader>
              <ModalBody>Are you sure want to delete bus?</ModalBody>
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
        <Modal className='modal-lg' isOpen={this.state.detail}>
          <ModalHeader>Bus Detail</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={2} />
              <Col md={8} >
                <Row>
                  <Col md={6}>
                    <Row>
                        Bus Picture:
                    </Row>
                    <Row>
                    <img src={Config.APP_BACKEND.concat(`bus/${this.state.picture}`)} width={200} height={200} alt={this.state.picture} />
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={6}>Name:</Col>
                      <Col md={6}> {this.state.name} </Col>
                    </Row>
                    <Row>
                      <Col md={6}>Bus name:</Col>
                      <Col md={6}> {this.state.busName} </Col>
                    </Row>
                    <Row>
                      <Col md={6}>Class bus:</Col>
                      <Col md={6}> {this.state.classBus} </Col>
                    </Row>
                    <Row>
                      <Col md={6}>Departure:</Col>
                      <Col md={6}> {this.state.departure} </Col>
                    </Row>
                    <Row>
                      <Col md={6}>Destination:</Col>
                      <Col md={6}> {this.state.destination} </Col>
                    </Row>
                    <Row>
                      <Col md={6}>Time go:</Col>
                      <Col md={6}> {this.state.timeGo} </Col>
                    </Row>
                    <Row>
                      <Col md={6}>Arrive:</Col>
                      <Col md={6}> {this.state.arrive} </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={() => this.setState({ detail: false})}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    bus: state.bus
  }
}

export default connect(mapStateToProps, {getBusses, deleteBus})(Bus)
