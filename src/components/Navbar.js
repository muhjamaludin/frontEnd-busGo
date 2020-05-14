import React, { Component } from 'react'
import { Nav, Col, Row, Input, NavItem } from 'reactstrap'
import { FiLogOut } from 'react-icons/fi'
import Styled from 'styled-components'
import '../styles/Navbar.css'

import history from '../utils/history'
import Loading from '../components/Loading'
import {setLogout} from '../redux/actions/AuthActions'
import {connect} from 'react-redux'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
    this.onLogout = () => {
      this.setState({ isLoading: true }, () => {
        // setTimeout(() => {
          this.setState({ isLoading: false }, () => {
            localStorage.removeItem('token')
            this.props.check()
            this.props.setLogout()
            history.push('/login')

          })
        // }, 1000)
      })
    }
  }

  render() {
    return (
      <Nav>
        <Row style={{ width: '101%', height: '8%', backgroundColor: '#fcf7f1' }}>
          <Col md={2}>
            <img
              src={require('../image/clipart-bus-logo.png')}
              style={{ width: '100px' }}
            />
          </Col>
          <Col md={5} className='mt-2' style={{fontSize: 26, fontWeight: 'bold', textAlign: 'left'}}>
            <p>Bus-Go Travel Apps</p>
          </Col>
          <Col md={5} className='text-right logout'>
            {/* <span
              className='badge btn-light nav-link mt-2'
              style={{ fontSize: 24, marginRight: '30px' }}
            >
              <MdNotifications style={{ color: '#f5d400' }} />
              <sup>5</sup>
            </span> */}
            {this.props.isLogin && (
              <abbr title='Logout'>
                <FiLogOut
                  onClick={this.onLogout}
                  style={{
                    fontSize: 28,
                    marginRight: '30px',
                    cursor: 'pointer', color: '#1d4e94',
                    alignItems: 'center'
                  }}
                />
              </abbr>
            )}
          </Col>
        </Row>
        {this.state.isLoading && <Loading />}
      </Nav>
    )
  }
}

export default connect(null, {setLogout})(Navbar)