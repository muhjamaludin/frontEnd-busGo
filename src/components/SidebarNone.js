import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import '../styles/app.css'

class SidebarNone extends Component {
    render () {
        return (
        <Col style={{border: '2px solid black'}} md={2}>
            
        </Col>
        )
    }
}
export default SidebarNone