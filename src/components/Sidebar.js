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
            <Col md={1} className='sidebar'>
                <ul className='mt-4' style={{ listStyle: 'none', marginLeft: -27 }}>
                    <Link to='/login'> <li> <FaHome size={20} /> <br/>Dashboard</li> </Link>
                    <Link to='/reserve'> <li> <FaTicketAlt size={20} /> Reservation</li></Link>
                    <Link to='/users'> <li><FaUsers size={20} /><br/> User</li> </Link>
                    <hr />
                    <Link to='/agents'> <li><FaUserTie size={20} /> <br/>Agent</li> </Link>
                    <Link to='/bus'> <li><FaBus size={20} /> <br/>Bus</li> </Link>
                    <Link to='/route'> <li><FaRoad size={20} /> <br/>Route</li> </Link>
                    <Link to='/schedule'> <li><AiOutlineSchedule size={20} /> <br/>Time List</li> </Link>
                    <Link to='/price'> <li><FaMoneyCheckAlt size={20} /> <br/>Price</li> </Link>
                    <hr />
                    {/* <li><FaRegUserCircle /> MyProfile</li> */}
                </ul>
            </Col>
        )
    }
}
export default Sidebar