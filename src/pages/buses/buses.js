import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import config from '../../utils/config'
import {getBusses} from '../../redux/actions/busActions'
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
  ModalFooter
} from 'reactstrap'
import { FiEdit, FiSearch } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import {FaEye} from 'react-icons/fa'

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
      console.log(data)
      console.log(pageInfo)
      this.setState({
        buses: data,
        pageInfo,
        startFrom: this.state.startFrom + pageInfo.perPage
      })
      console.log(this.state)
    }
    this.prevData = async () => {
      const results = await axios.get(this.state.pageInfo.prevLink)
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({
        buses: data,
        pageInfo,
        startFrom: this.state.startFrom - pageInfo.perPage
      })
    }
    this.searchBus = async e => {
      const results = await axios.get(
        config.APP_BACKEND.concat(`bus?search[bus_name]=${e.target.value}`)
      )
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({ buses: data, pageInfo })
    }
    this.sortBus = async () => {
      this.setState({ sort: this.state.sort ? '' : 1 })
      const results = await axios.get(
        config.APP_BACKEND.concat(`bus?sort[bus_name]=${this.state.sort}`)
      )
      const { data } = results.data
      const { pageInfo } = results.data
      this.setState({ buses: data, pageInfo })
    }
    this.deleteData = async () => {
      const results = await axios.delete(
        config.APP_BACKEND.concat(`bus/${this.state.selectedId}`)
      )
      if (results.data.success) {
        const newData = await axios.get(config.APP_BACKEND.concat('bus'))
        const { data } = newData.data
        const { pageInfo } = newData.data
        this.setState({
          buses: data,
          pageInfo,
          showModal: false,
          selectedId: 0
        })
      } else {
        console.log(results.data)
      }
    }
  }

  async componentDidMount() {
    this.props.getBusses()
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
                  <th>Class Bus</th>
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
                      <td>{1 + i}</td>
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
            <Col md={3} className='text-center'>
                <Button
                  disabled={this.state.pageInfo.prevLink ? false : true}
                  onClick={this.prevData}
                  className='previous'
                >
                  &#8249;
                </Button>
              </Col>
              <Col md={6} className='text-center'>
                <Button
                  disabled={this.state.pageInfo.nextLink ? false : true}
                  onClick={this.nextData}
                  className='next'
                >
                  &#8250;
                </Button>
              </Col>
              <Col md={3} className='text-right '>
                Page {this.props.bus.pageInfo.page}/{this.props.bus.pageInfo.totalPage}{' '}
                Total Data {this.props.bus.pageInfo.totalData} Limit{' '}
                {this.props.bus.pageInfo.perPage}
              </Col>
            </Row>
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete Bus</ModalHeader>
              <ModalBody>Are u sure want to delete bus?</ModalBody>
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

export default connect(mapStateToProps, {getBusses})(Bus)
