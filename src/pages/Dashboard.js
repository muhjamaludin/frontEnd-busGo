import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkData } from '../redux/actions/busGo'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'

// styles
import '../styles/app.css'
import { Col, Row } from 'reactstrap'
import { Chart } from 'react-charts'



class Dashboard extends Component {
  constructor(props){
    super(props)
    
    this.checkToken = () => {
      if(!localStorage.getItem('token')){
        alert('You must login first')
        props.history.push('/login')
      }
    } 
  }

  componentDidMount() {
    this.checkToken()
  }
  
  render() {
    return (
          <div>
          <Row className='mt-2'>
          <Sidebar />
          <Col md={10}>
            <Card />
            <Row className='mt-4' style={{height: '400px'}}>
              <Col md={6}>
              User Interactions
              </Col> 
              <Col md={6}>
                <Row style={{height: '300px'}}>
                  <Col md={12}>
                    Top Product
                  </Col>
                </Row>
                <Row style={{height: '100px'}}>
                  <Col md={6}>
                    Customer Satisfaction
                  </Col>
                  <Col md={6}>
                    Browser Stat
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row >
              <Col md={12}>
                Reservation Status
              </Col>
            </Row>
          </Col>
          </Row>
          </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    busGo: state.busGo
  }
}

const mapDispatchToProps = {checkData}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)