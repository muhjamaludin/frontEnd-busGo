import React, { Component } from 'react'
import config from '../../utils/config'
import axios from 'axios'
import { connect } from 'react-redux'
import { getPrices, deletePrice } from '../../redux/actions/priceActions'

import {
  Table, Container, Button,
  Row, Col, Form, FormGroup,
  Label, Input, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { FiEdit, FiSearch } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { FaEdit, FaSort } from 'react-icons/fa'

class Price extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
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
      searchKey: 'price',
      sortKey: 'price',
      searchValue: '',
      sortValue: 0,
      currentPage: 1,
      sort: 0,
      showModal: false,
      selectedId: 0,
      startFrom: 1
    }
    this.limit = (e) => {
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('limit', this.state.limit)
      this.props.getPrices(page, limit, searchKey, searchValue, sortKey, sortValue)
    }

    this.nextData = () => {
      this.setState({page: this.state.page + 1, startFrom: this.state.startFrom + this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.props.getPrices(page + 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.prevData = () => {
      this.setState({page: this.state.page - 1, startFrom: this.state.startFrom - this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.props.getPrices(page - 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.searchPrice = async (e) => {
      this.setState({searchValue: e.target.value})
      const {page, limit, searchKey, sortKey, sortValue} = this.state
      this.props.getPrices(page, limit, searchKey, e.target.value, sortKey || 'username', sortValue)
    }
    this.sort = async () => {
      if (this.state.sortValue === 1) {
        this.setState({sortValue: 0})
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        this.props.getPrices(page, limit, searchKey, searchValue, sortKey, sortValue)
      } else {
        this.setState({sortValue: 1})
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        this.props.getPrices(page, limit, searchKey, searchValue, sortKey, sortValue)
      }
    }
    this.deleteData = async () => {
      const id = this.state.selectedId
      this.props.deletePrice(id)
      this.props.getPrices(1, 5, this.state.searchKey || 'price', this.state.searchValue || '', this.state.sortKey || 'price', this.state.sortValue || '')
      this.setState({showModal: false})
    }
  }
  async componentDidMount() {
    this.props.getPrices(1, 5, this.state.searchKey || 'price', this.state.searchValue || '', this.state.sortKey || 'price', this.state.sortValue || 0)
  }

  render() {
    console.log(this.props)
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
                    <table style={{ width: '100%' }}>
                      <tr>
                        <td>
                          <div className='searchbar'>
                            <i class="fas fa-search"></i>
                            <Input type='search' placeholder='input your price' onChange={this.searchPrice} />
                          </div>
                        </td>
                        <td>
                            <label></label>
                            <select onChange={(e) => this.setState({searchKey: e.target.value})} >
                              <option value="price">Price</option>
                            </select>
                          </td>
                          <td>
                            <select onChange={(e)=> this.setsta({sortKey: e.target.value})} >
                              <option value="price" >Price</option>
                            </select>
                            <FaSort color={'#053354'} size={23} onClick={this.sort} />
                          </td>
                        <td className='text-right'>
                          <Link to='/price/add'><button type='submit' className='btn btn-success buttonAdd'> Add Price</button></Link>
                        </td>
                      </tr>
                    </table>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Table>
              <thead className="thead-dark">
                <tr className='text-center'>
                  <th>No</th>
                  <th>Bus Name</th>
                  <th>Class Bus</th>
                  <th>Departure</th>
                  <th>Destination</th>
                  <th>Time Go</th>
                  <th>Arrive</th>
                  <th onClick={this.sortPrice} className='priceSort'>Price <i class="fas fa-sort"></i></th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.prices.prices.length && this.props.prices.prices.map((v, i) => (
                  <tr className='text-center' >
                    <td>{(this.state.startFrom + i)}</td>
                    <td>{v.bus_name}</td>
                    <td>{v.class_bus}</td>
                    <td>{v.departure}</td>
                    <td>{v.destination}</td>
                    <td>{v.departure_time}</td>
                    <td>{v.arrive_time}</td>
                    <td>{v.price}</td>
                    <td>
                      <Link className='buttonEdit' to={`/price/${v.id}`}>
                        <FaEdit size={16} />
                      </Link>
                      <button className='buttonDelete' onClick={() => this.setState({ showModal: true, selectedId: v.id })} >
                        <MdDeleteForever size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row>
            <Col md={2} className='text-center'>
                <Button disabled={this.props.prices.pageInfo.prevLink ? false : true} onClick={this.prevData} className='previous'>&#8249;</Button>
              </Col>
              <Col md={5} className='text-center'>
                <Button disabled={this.props.prices.pageInfo.nextLink ? false : true} onClick={this.nextData} className='next'>&#8250;</Button>
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
                Page {this.props.prices.pageInfo.page}/{this.props.prices.pageInfo.totalPage} Total Data {this.props.prices.pageInfo.totalData} Limit {this.props.prices.pageInfo.perPage}
              </Col>
            </Row>
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete Price</ModalHeader>
              <ModalBody>Are you sure want to delete price?</ModalBody>
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

const mapStateToProps = (state) => {
  console.log('harga', state.price)
  return {
    prices: state.price
  }
}

const mapDispatchToProps = { getPrices, deletePrice }

export default connect(mapStateToProps, mapDispatchToProps)(Price)
