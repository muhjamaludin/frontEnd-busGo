import React, { Component } from 'react'
import axios from 'axios'
import config from '../../utils/config'
import { connect } from 'react-redux'
import { getAgents, deleteAgent, searchData, movePage } from '../../redux/actions/agentActions'

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

import Pagination from '../../components/Pagination'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { FiEdit, FiSearch } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { FaEdit, FaSearch } from 'react-icons/fa'

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
      currentPage: 1,
      sort: 0,
      showModal: false,
      selectedId: 0,
      startFrom: 1,
      name: ''
    }

    this.searchAgent = (e) => {
      this.setState({
        name: e.currentTarget.value
      })
      console.log(this.state.name)
    }
    this.Clicked = (e) => {
      this.props.searchData(this.state.name)
    }
    this.onPageChange = data => {
      const { currentPage, totalPage, pageLimit } = data
      this.props.movePage(currentPage)
      console.log(data)
    }

    this.nextData = () => {
      const data = this.props.agents
      console.log(data)
      const pageInfo = this.props.agents.pageInfo
      console.log(pageInfo)
      this.setState({
        agents: data,
        pageInfo,
        startFrom: this.state.startFrom + pageInfo.perPage,
      })
      console.log(this.state.startFrom, this.state.agents)
    }
    this.prevData = async () => {
      const results = this.props.agents.pageInfo.prevLink
      const { data } = results
      const { pageInfo } = results
      this.setState({
        agents: data,
        pageInfo,
        startFrom: this.state.startFrom - pageInfo.perPage,
      })
    }
    this.searchAgent = async e => {
      this.props.getAgents(e.target.value)
      // const { data } = results.data;
      // const { pageInfo } = results.data;
      // this.setState({ agents: data, pageInfo });
    };
    // this.sortAgent = async () => {
    //   this.setState({ sort: this.state.sort ? '' : 1 });
    //   const results = await axios.get(
    //     config.APP_BACKEND.concat(`agents?sort[agent]=${this.state.sort}`)
    //   );
    //   const { data } = results.data;
    //   const { pageInfo } = results.data;
    //   this.setState({ agents: data, pageInfo });
    // };
    this.deleteData = async e => {
      e.preventDefault()
      const id = this.state.selectedId
      console.log('id', id)
      await this.props.deleteAgent(id)
      await this.props.getAgents()
      this.setState({showModal: false})
    }
  }
  componentDidMount() {
    this.props.getAgents()
  }

  render() {
    console.log('info', this.props.agents.pageInfo)
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1}></Col>
          <Col md={9} className='mt-4'>
            <Row>
              <Col md={12}>
                {this.props.agents && this.props.agents.agents.length !== 0 ? (
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
                ) : (<div>Data is not available</div>)}
              </Col>
            </Row>
            <Table>
              <thead className='thead-dark'>
                <tr className='text-center'>
                  <th>No</th>
                  <th>Username</th>
                  <th onClick={this.sortAgent}>Agency Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.agents.agents && this.props.agents.agents.length && this.props.agents.agents &&
                  this.props.agents.agents.map((v, i) => (
                    <tr className='text-center'>
                      <td>{1 + i}</td>
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
                    this.props.agents && this.props.agents.pageInfo.prevLink ? false : true
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
                    this.props.agents.pageInfo && this.props.agents.pageInfo.nextLink ? false : true
                  }
                  onClick={this.nextData}
                  className='next'
                >
                  &#8250;
                </Button>
              </Col> */}
              {/* <Col md={3} className='text-right'>
                Page {this.props.pageInfo && this.props.pageInfo.page}/
                {this.props.pageInfo && this.props.pageInfo.totalPage}{' '} Total
                Data {this.props.pageInfo && this.props.pageInfo.totalData}
                Limit {this.props.pageInfo && this.props.pageInfo.perPage}{' '}
              </Col>
            </Row>
            <Row>
              {/* <Col md={12} className='text-center'>
                <Pagination totalRecords={this.props.pageInfo && this.props.pageInfo.totalData}
                  pageLimit={this.props.pageInfo && this.props.pageInfo.perPage}
                  pageNeighbours={0}
                  onPageChanged={this.onPageChanged} />
              </Col> */}
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
    agents: state.agents
  }
}

const mapDispatchToProps = { getAgents, deleteAgent }

export default connect(mapStateToProps, mapDispatchToProps)(Agent)
