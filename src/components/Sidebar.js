import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import '../styles/app.css'
import {
    FaHome, FaRegUserCircle, FaMoneyCheckAlt, FaBus,
    FaUsers, FaUserTie, FaRoad, FaTicketAlt
} from 'react-icons/fa'
import { AiOutlineSchedule } from 'react-icons/ai'

class Sidebar extends Component {
    render() {
        return (
            <Col md={2} className='sidebar'>
                <ul className='mt-4' style={{ listStyle: 'none' }}>
                    <Link to='/login'> <li><FaHome />Dashboard</li> </Link>
                    <Link to='/reserve'> <li> <FaTicketAlt /> Reservation</li></Link>
                    <Link to='/users'> <li><FaUsers /> User</li> </Link>
                    <hr />
                    <Link to='/agents'> <li><FaUserTie /> Agent</li> </Link>
                    <Link to='/bus'> <li><FaBus /> Bus</li> </Link>
                    <Link to='/route'> <li><FaRoad /> Route</li> </Link>
                    <Link to='/schedule'> <li><AiOutlineSchedule /> Schedule</li> </Link>
                    <Link to='/transaction'> <li><FaMoneyCheckAlt /> Price</li> </Link>
                    <hr />
                    {/* <li><FaRegUserCircle /> MyProfile</li> */}
                </ul>
            </Col>
        )
    }
}
export default Sidebar