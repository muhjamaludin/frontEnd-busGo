import React, {Component} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col} from 'reactstrap'
import Config from '../../utils/config'

class BusDetail extends Component {
  render() {
    const {modalDetail} = this.props
    return (
      <Modal className='modal-lg' isOpen={this.state.Profile}>
          <ModalHeader>Profile</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={2} />
              <Col md={8} >
                <Row>
                  <Col md={6}>
                    <Row>
                        Profile picture:
                    </Row>
                    <Row>
                    <img src={Config.APP_BACKEND.concat(`profile/${this.state.picture}`)} width={200} height={200} alt={this.state.picture} />
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={4}>Username:</Col>
                      <Col md={8}> {this.state.username} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Fullname:</Col>
                      <Col md={6}> {this.state.fullname} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Identity:</Col>
                      <Col md={6}> {this.state.identity} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Gender:</Col>
                      <Col md={6}> {this.state.gender} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Phone:</Col>
                      <Col md={6}> {this.state.phone} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Address:</Col>
                      <Col md={6}> {this.state.address} </Col>
                    </Row>
                    <Row>
                      <Col md={4}>Balance:</Col>
                      <Col md={6}> {this.state.balance} </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={() => this.setState({ Profile: false})}>Cancel</Button>
          </ModalFooter>
        </Modal>
    )
  }
}

export default BusDetail