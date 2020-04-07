import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getAgents, searchData, movePage } from '../../redux/actions/agentActions'

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

    // this.nextData = () => {
    //   const data = this.props.agents.data.data
    //   console.log(data)
    //   const pageInfo = this.props.agents.data.pageInfo
    //   console.log(pageInfo)
    //   this.setState({
    //     agents: data,
    //     pageInfo,
    //     startFrom: this.state.startFrom + pageInfo.perPage,
    //   })
    //   console.log(this.state)
    // }
    // this.prevData = async () => {
    //   const results = await axios.get(this.state.pageInfo.prevLink)
    //   const { data } = results.data
    //   const { pageInfo } = results.data
    //   this.setState({
    //     agents: data,
    //     pageInfo,
    //     startFrom: this.state.startFrom - pageInfo.perPage,
    //   })
    // }
    // this.searchAgent = async e => {
    //   const results = await axios.get(
    //     config.APP_BACKEND.concat(`agents?search[agent]=${e.target.value}`)
    //   );
    //   const { data } = results.data;
    //   const { pageInfo } = results.data;
    //   this.setState({ agents: data, pageInfo });
    // };
    // this.sortAgent = async () => {
    //   this.setState({ sort: this.state.sort ? '' : 1 });
    //   const results = await axios.get(
    //     config.APP_BACKEND.concat(`agents?sort[agent]=${this.state.sort}`)
    //   );
    //   const { data } = results.data;
    //   const { pageInfo } = results.data;
    //   this.setState({ agents: data, pageInfo });
    // };
    // this.deleteData = async () => {
    //   const results = await axios.delete(
    //     config.APP_BACKEND.concat(`agents/${this.state.selectedId}`)
    //   );
    //   if (results.data.success) {
    //     console.log('test');
    //     const newData = await axios.get(config.APP_BACKEND.concat('agents'));
    //     const { data } = newData.data;
    //     const { pageInfo } = newData.data;
    //     this.setState({
    //       agents: data,
    //       pageInfo,
    //       showModal: false,
    //       selectedId: 0
    //     });
    //   } else {
    //     console.log(results.data);
    //   }
    // };
  }
  componentDidMount() {
    console.log('MOUNTED')
    this.props.getAgents()
  }

  render() {
    console.log('props', this.props.agents)
    return (
      <>
        <Row>
          <Sidebar />
          <Col md={1}></Col>
          <Col md={8} className='mt-4'>
            <Row>
              <Col md={10}>
                {this.props.agents && this.props.agents.length !== 0 ? (
                  <Form>
                    <FormGroup>
                      <table style={{ width: '100%' }}>
                        <tr>
                          <td style={{ width: '80%' }}>
                            <div className='searchbar'>
                              <i class='fas fa-search'></i>
                              <Input
                                type='search'
                                placeholder='input your agent'
                                onChange={this.searchAgent}
                              />
                            </div>
                            <div>
                              {/* <FaSearch onClick={this.Clicked} /> */}
                            </div>
                          </td>
                          <td className='text-right'>
                            <Link to='/agents/add'>
                              <button
                                type='submit'
                                className='btn btn-success buttonAdd'
                              >
                                {' '}
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
                  <th>id User</th>
                  <th onClick={this.sortAgent}>Agency Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.agents && this.props.agents.length && this.props.agents &&
                  this.props.agents.map((v, i) => (
                    <tr className='text-center'>
                      <td>{1 + i}</td>
                      <td>{v.id_user}</td>
                      <td>{v.name}</td>
                      <td>
                        <Link
                          className='buttonEdit'
                          to={`/agents/${this.props.agents[i].id}`}
                        >
                          <FaEdit size={24} />
                        </Link>
                        <button
                          className='buttonDelete'
                          onClick={() =>
                            this.setState({
                              showModal: true,
                              selectedId: this.props.agents[i].id,
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
              <Col md={12} className='text-right'>
                Page {this.props.pageInfo && this.props.pageInfo.page}/
                {this.props.pageInfo && this.props.pageInfo.totalPage}{' '} Total
                Data {this.props.pageInfo && this.props.pageInfo.totalData}
                Limit {this.props.pageInfo && this.props.pageInfo.perPage}{' '}
              </Col>
            </Row>
            <Row>
              <Col md={12} className='text-center'>
                <Pagination totalRecords={this.props.pageInfo && this.props.pageInfo.totalData}
                  pageLimit={this.props.pageInfo && this.props.pageInfo.perPage}
                  pageNeighbours={0}
                  onPageChanged={this.onPageChanged} />
              </Col>
            </Row>
            <Modal isOpen={this.props.showModal}>
              <ModalHeader>Delete Agent</ModalHeader>
              <ModalBody>Are u sure want to delete agent?</ModalBody>
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
    agents: state.agents.agents,
    pageInfo: state.agents.pageInfo
  }
}

const mapDispatchToProps = { getAgents }

export default connect(mapStateToProps, mapDispatchToProps)(Agent)
