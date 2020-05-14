import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRoutes,createRoutes, deleteRoutes } from '../../redux/actions/routeActions'

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
  ModalFooter, Collapse, Card, CardBody
} from 'reactstrap'

import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import { FaEdit, FaSort, FaCheck } from 'react-icons/fa'

class Route extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: [],
      searchKey: 'departure',
      sortKey: 'departure',
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
      collapseOpen: false,
      currentPage: 1,
      sort: 0,
      showModal: false,
      selectedId: 0,
      startFrom: 1,
    }
    this.limit = (e) => {
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('limit', this.state.limit)
      this.props.getRoutes(page, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.nextData = async () => {
      this.setState({page: this.state.page + 1, startFrom: this.state.startFrom + this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('next', this.state.page)
      this.props.getRoutes(page + 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.prevData = async () => {
      this.setState({page: this.state.page - 1, startFrom: this.state.startFrom - this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('next', this.state.page)
      this.props.getRoutes(page - 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.searchRoute = async (e) => {
      this.setState({searchValue: e.target.value})
      const {page, limit, searchKey, sortKey, sortValue} = this.state
      this.props.getRoutes(page, limit, searchKey, e.target.value, sortKey, sortValue)
    }
    this.sort = async () => {
      if (this.state.sortValue === 1) {
        this.setState({sortValue: 0})
        this.props.getRoutes(this.state.page, this.state.limit, this.state.searchKey, this.state.searchValue, this.state.sortKey, this.state.sortValue)
      } else {
        this.setState({sortValue: 1})
        this.props.getRoutes(this.state.page, this.state.limit, this.state.searchKey, this.state.searchValue, this.state.sortKey, this.state.sortValue)
      }
    }
    this.deleteData = async () => {
      const id = this.state.selectedId
      this.props.deleteRoutes(id)
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.setState({showModal: false})
      console.log('wow', page, limit, searchKey, searchValue, sortKey, sortValue)
      this.props.getRoutes(page || 1, limit || 5, searchKey || '', searchValue || '', sortKey || '', sortValue || '')
    }
  }
  componentDidMount() {
    const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
    this.props.getRoutes(page || 1, limit || 5, searchKey || '', searchValue || '', sortKey || '', sortValue || '')
  }

  render() {
    console.log('this', this.props.pageInfo)
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1}></Col>
          <Col md={9} className='mt-4' >
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
                              placeholder='input your route'
                              onChange={this.searchRoute}
                            />
                          </div>
                        </td>
                        {/* <td>
                        <Button color="primary" onClick={this.toggleCollapse} style={{ marginBottom: '1rem' }}>Toggle</Button>
                          <Collapse isOpen={this.state.collapseOpen}>
                          <label>Search By</label>
                            <select onChange={(e) => this.setState({searchKey: e.target.value})} >
                              <option value="departure">Departure</option>
                              <option value="destination" >Destination</option>
                            </select>
                          </Collapse>
                        </td> */}
                        <td>
                            <label>Search By</label>
                            <select onChange={(e) => this.setState({searchKey: e.target.value})} >
                              <option value="departure">Departure</option>
                              <option value="destination" >Destination</option>
                            </select>
                          </td>
                          <td>
                            <label>Sort By</label>
                            <select onChange={(e) => this.setState({sortKey: e.target.value})} >
                              <option value="departure" > Departure</option>
                              <option value="destination" >Destination</option>
                            </select>
                            <FaSort color={'#053354'} size={23} onClick={this.sort} />
                          </td>
                        <td className='text-right'>
                          <Link to='/route/add'>
                            <button
                              type='submit'
                              className='btn btn-success buttonAdd'
                            >
                              {' '}
                              Add Route
                            </button>
                          </Link>
                        </td>
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
                  <th >Departure</th>
                  <th>Destination</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.routes &&
                  this.props.routes.length &&
                  this.props.routes &&
                  this.props.routes.map((data, i) => (
                    <tr className='text-center'>
                      <td>{i + this.state.startFrom}</td>
                      <td>{data.departure}</td>
                      <td>{data.destination}</td>
                      <td>
                        <Link
                          className='buttonEdit'
                          to={`/route/${this.props.routes[i].id}`}
                        >
                          <FaEdit size={24} />
                        </Link>
                        <button
                          className='buttonDelete'
                          onClick={() =>
                            this.setState({
                              showModal: true,
                              selectedId: this.props.routes[i].id,
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
            <Col md={2} className='text-center'>
                <Button
                  disabled={
                    this.props.pageInfo && this.props.pageInfo.prevLink
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
                    this.props.pageInfo && this.props.pageInfo.nextLink
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
                Page {this.props.pageInfo && this.props.pageInfo.page}/
                {this.props.pageInfo && this.props.pageInfo.totalPage} Total
                Data {this.props.pageInfo && this.props.pageInfo.totalData}{' '}
                Limit {this.props.pageInfo && this.props.pageInfo.perPage}
              </Col>
            </Row>
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete route</ModalHeader>
              <ModalBody>Are you sure want to delete route?</ModalBody>
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
  return {
    routes: state.route.routes,
    pageInfo: state.route.pageInfo
  }
}

const mapDispatchToProps = { getRoutes, createRoutes, deleteRoutes }

export default connect(mapStateToProps, mapDispatchToProps)(Route)
