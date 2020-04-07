import React, { Component } from 'react'
import config from '../../utils/config'
import axios from 'axios'
import { connect } from 'react-redux'
import { getPrices } from '../../redux/actions/priceActions'

import {
  Table, Container, Button,
  Row, Col, Form, FormGroup,
  Label, Input, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { FiEdit, FiSearch } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

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
      currentPage: 1,
      sort: 0,
      showModal: false,
      selectedId: 0,
      startFrom: 1
    }

    // this.nextData = async () => {
    //   const results = await axios.get(this.state.pageInfo.nextLink)
    //   const { data } = results.data
    //   const { pageInfo } = results.data
    //   this.setState({ transactions: data, pageInfo, startFrom: this.state.startFrom + pageInfo.perPage })
    // }
    // this.prevData = async () => {
    //   const results = await axios.get(this.state.pageInfo.prevLink)
    //   const { data } = results.data
    //   const { pageInfo } = results.data
    //   this.setState({ transactions: data, pageInfo, startFrom: this.state.startFrom - pageInfo.perPage })
    // }
    // this.searchPrice = async (e) => {
    //   const results = await axios.get(config.APP_BACKEND.concat(`transaction?search[price]=${e.target.value}`))
    //   const { data } = results.data
    //   const { pageInfo } = results.data
    //   this.setState({ transactions: data, pageInfo })
    // }
    // this.sortPrice = async () => {
    //   this.setState({ sort: (this.state.sort ? '' : 1) })
    //   const results = await axios.get(config.APP_BACKEND.concat(`transaction?sort[price]=${this.state.sort}`))
    //   const { data } = results.data
    //   const { pageInfo } = results.data
    //   this.setState({ transactions: data, pageInfo })
    // }
    // this.deleteData = async () => {
    //   const results = await axios.delete(config.APP_BACKEND.concat(`transaction/${this.state.selectedId}`))
    //   if (results.data.success) {
    //     console.log('test')
    //     const newData = await axios.get(config.APP_BACKEND.concat('transaction'))
    //     const { data } = newData.data
    //     const { pageInfo } = newData.data
    //     this.setState({ transactions: data, pageInfo, showModal: false, selectedId: 0 })
    //   } else {
    //     console.log(results.data)
    //   }
    // }
  }
  async componentDidMount() {
    this.props.getPrices()
  }

  render() {
    console.log(this.props)
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1}></Col>
          <Col md={8}>
            <Row>
              <Col md={10}>
                <Form>
                  <FormGroup>
                    <table style={{ width: '100%' }}>
                      <tr>
                        <td style={{ width: '80%' }}>
                          <div className='searchbar'>
                            <i class="fas fa-search"></i>
                            <Input type='search' placeholder='input your price' onChange={this.searchPrice} />
                          </div>
                        </td>
                        <td className='text-right'>
                          <Link to='/transaction/add'><button type='submit' className='btn btn-success buttonAdd'> Add Price</button></Link>
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
                    <td>{v.classBus}</td>
                    <td>{v.departure}</td>
                    <td>{v.destination}</td>
                    <td>{v.departure_time}</td>
                    <td>{v.arrive_time}</td>
                    <td>{v.price}</td>
                    <td>
                      <Link className='buttonEdit' to={`/transaction/${this.props.prices.prices.id}`}>
                        <FaEdit size={16} />
                      </Link>
                      <button className='buttonDelete' onClick={() => this.setState({ showModal: true, selectedId: this.state.transactions[i].id })} >
                        <MdDeleteForever size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row>
              <Col md={12} className='text-right'>
                Page {this.props.prices.pageInfo.page}/{this.props.prices.pageInfo.totalPage} Total Data {this.props.prices.pageInfo.totalData} Limit {this.props.prices.pageInfo.perPage}
              </Col>
            </Row>
            <Row>
              <Col md={6} className='text-center'>
                <Button disabled={this.props.prices.pageInfo.prevLink ? false : true} onClick={this.prevData} className='previous'>&#8249;</Button>
              </Col>
              <Col md={6} className='text-center'>
                <Button disabled={this.props.prices.pageInfo.nextLink ? false : true} onClick={this.nextData} className='next'>&#8250;</Button>
              </Col>
            </Row>
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete Bus</ModalHeader>
              <ModalBody>Are u sure want to delete price?</ModalBody>
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
  console.log(state)
  return {
    prices: state.price
  }
}

const mapDispatchToProps = { getPrices }

export default connect(mapStateToProps, mapDispatchToProps)(Price)
