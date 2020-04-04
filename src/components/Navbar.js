import React, { Component } from 'react'
import { Nav, Col, Row, Input, NavItem } from 'reactstrap'
import { MdNotifications, MdReorder } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'

import history from '../utils/history'
import Loading from '../components/Loading'

export default class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
          isLoading: false
        }
        this.onLogout = () => {
          this.setState({isLoading: true},()=>{
            setTimeout(()=>{
              this.setState({isLoading: false}, ()=>{
                localStorage.removeItem('token')
                this.props.check()
                history.push('/login')
              })
            },1000)
          })
        }
      }

    render () {
        return(
        <Nav>
            <Row style={{width: '100%'}} className='bg-light'>
                <Col md={2}>
                    <img src={require('../image/clipart-bus-logo.png')} style={{width: '100px'}} />
                </Col>
                <Col md={1}>
                    <MdReorder style={{fontSize: 40}} />
                </Col>
                <Col md={4}>
                    <Input type='text' className='dash' placeholder='search' /> 
                </Col>
                <Col md={5} className='text-right'>
                <span className='badge btn-light nav-link' style={{fontSize: 24, marginRight: '30px'}}><MdNotifications style={{color: '#f5d400'}} /><sup>5</sup></span>
                {this.props.isLogin &&(
                    <abbr title='Logout'>
                        <FiLogOut onClick={this.onLogout} style={{fontSize: 28, marginRight: '30px', cursor: 'pointer'}} />
                    </abbr>
                )}
                </Col>
            </Row>
            {this.state.isLoading && (<Loading/>)}
        </Nav>
        
        )
    }
}
