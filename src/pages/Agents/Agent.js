import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAgents, deleteAgent} from '../../redux/actions/agentActions'

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
import { FiEdit, FiSearch } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { FaEdit, FaSort } from 'react-icons/fa'

class Agent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      agents: [],
      pageInfo: {
        page: 0,
        perPage: 0,
        totalData: 0,
        totalPage: 0,
        nextLink: null,
        prevLink: null,
      },
      searchKey: 'name',
      sortKey: 'username',
      searchValue: '',
      sortValue: '',
      page: 1,
      limit: 5,
      currentPage: 1,
      sort: 0,
      showModal: false,
      selectedId: 0,
      startFrom: 1,
      name: ''
    }
    this.limit = (e) => {
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('limit', this.state.limit)
      this.props.getAgents(page, limit, searchKey, searchValue, sortKey, sortValue)
    }

    this.nextData = () => {
      console.log('ayam')
      this.setState({page: this.state.page + 1, startFrom: this.state.startFrom + this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('next', this.state.page)
      this.props.getAgents(page + 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.prevData = () => {
      this.setState({page: this.state.page - 1, startFrom: this.state.startFrom - this.state.limit})
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      console.log('next', this.state.page)
      this.props.getAgents(page - 1, limit, searchKey, searchValue, sortKey, sortValue)
    }
    this.searchAgent = async (e) => {
      this.setState({searchValue: e.target.value})
      const {page, limit, searchKey, sortKey, sortValue} = this.state
      this.props.getAgents(page, limit, searchKey, e.target.value, sortKey || 'username', sortValue)
    }
    this.sort = async () => {
      if (this.state.sortValue === 1) {
        this.setState({sortValue: 0})
        console.log('0', this.state.sortkey)
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        this.props.getAgents(page, limit, searchKey, searchValue, sortKey, sortValue)
      } else {
        this.setState({sortValue: 1})
        const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
        console.log('this', this.state)
        this.props.getAgents(page, limit, searchKey, searchValue, sortKey, sortValue)
      }
    }
    this.deleteData = async () => {
      const id = this.state.selectedId
      this.props.deleteAgent(id)
      const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
      this.setState({showModal: false})
      console.log('wow', page, limit, searchKey, searchValue, sortKey, sortValue)
      this.props.getAgents(page || 1, limit || 5, searchKey || '', searchValue || '', sortKey || '', sortValue || '')
    }
  }
  componentDidMount() {
    const {page, limit, searchKey, searchValue, sortKey, sortValue} = this.state
    this.props.getAgents(page || 1, limit || 5, searchKey || '', searchValue || '', sortKey || 'name', sortValue || 1)
  }

  render() {
    console.log('info', this.props.pageInfo)
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1}></Col>
          <Col md={9} className='mt-4'>
            <Row>
              <Col md={12}>
                {/* {this.props.agents && this.props.agents.length !== 0 ? ( */}
                  <Form>
                    <FormGroup>
                      <table style={{width: '100%'}}>
                        <tr>
                          <td>
                            <div className='searchbar'>
                              <i class='fas fa-search'></i>
                              <Input
                                type='search'
                                placeholder='input your agent'
                                onChange={this.searchAgent}
                              />
                            </div>                    
                          </td>
                          <td>
                            <label>Search By</label>
                            <select onChange={(e) => this.setState({searchKey: e.target.value})}>
                              <option value="username" >username</option>
                              <option value="name" >agent</option>
                            </select>
                          </td>
                          <td>
                            <label>Sort By</label>
                            <select onChange={(e) => this.setState({sortKey: e.target.value})}>
                              <option value="username" >username</option>
                              <option value="name" >agent</option>
                            </select>
                            <FaSort color={'#053354'} size={23} onClick={this.sort} />
                          </td>
                          <td className='text-right'>
                            <Link to='/agents/add'>
                              <button
                                type='submit'
                                className='btn btn-success buttonAdd'
                              >
                              Add Agent
                            </button>
                            </Link>
                          </td>
                        </tr>
                      </table>
                    </FormGroup>
                  </Form>
                {/* ) : (<div>Data is not available</div>)} */}
              </Col>
            </Row>
            <Table>
              <thead className='thead-dark'>
                <tr className='text-center'>
                  <th>No</th>
                  <th>Username</th>
                  <th>Agency Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.agents && this.props.agents.length && this.props.agents &&
                  this.props.agents.map((v, i) => (
                    <tr className='text-center'>
                      <td>{this.state.startFrom + i}</td>
                      <td>{v.username}</td>
                      <td>{v.name}</td>
                      <td>
                        <Link
                          className='buttonEdit'
                          to={`/agents/${v.id}`}
                        >
                          <FaEdit size={24} />
                        </Link>
                        <button
                          className='buttonDelete'
                          onClick={() =>
                            this.setState({
                              showModal: true,
                              selectedId: v.id,
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
                    this.props.pageInfo && this.props.pageInfo.prevLink ? false : true
                  }
                  onClick={this.prevData}
                  className='previous'
                >
                  &#8249;
                </Button>
              </Col>
              <Col md={4} className='text-center'>
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
                {this.props.pageInfo && this.props.pageInfo.totalPage}{' '} Total
                Data {this.props.pageInfo && this.props.pageInfo.totalData} 
                Limit {this.props.pageInfo && this.props.pageInfo.perPage}{' '}
              </Col>
            </Row>
            
            <Modal isOpen={this.state.showModal}>
              <ModalHeader>Delete Agent</ModalHeader>
              <ModalBody>Are you sure want to delete this agent?</ModalBody>
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
    agents: state.agents.agents,
    pageInfo: state.agents.pageInfo
  }
}

const mapDispatchToProps = { getAgents, deleteAgent }

export default connect(mapStateToProps, mapDispatchToProps)(Agent)
