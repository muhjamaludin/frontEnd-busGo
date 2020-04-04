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
                    <img src={require('../image/arka.png')} style={{width: '100px'}} />
            {this.state.isLoading && (<Loading/>)}
            </Row>
        </Nav>
        
        )
    }
}
