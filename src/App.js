import React from 'react'
import { Row } from 'reactstrap'
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'
import history from './utils/history'
import { connect } from 'react-redux'
import {} from './redux/actions/AuthActions'

/* Custom Component */
import Navbar from './components/Navbar'
import NavbarMenu from './components/NavbarMenu'
import Sidebar from './components/Sidebar'

/* Pages */
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EditBoard from './pages/Reservations/EditBoard'
import AddBoard from './pages/Reservations/CreateBoard'
import Users from './pages/Users/Users'
import EditUser from './pages/Users/Edit'
import Agents from './pages/Agents/Agent'
import CreateAgents from './pages/Agents/Post'
import EditAgents from './pages/Agents/Edit'
import Buses from './pages/buses/buses'
import EditBus from './pages/buses/Edit'
import CreateBus from './pages/buses/CreateBus'
import Routes from './pages/Route/Routes'
import CreateRoutes from './pages/Route/Post'
import EditRoute from './pages/Route/Edit'
import Schedules from './pages/Schedule/Schedules'
import EditSchedules from './pages/Schedule/Edit'
import CreateSchedules from './pages/Schedule/CreateSchedule'
import Prices from './pages/Price/Prices'
import EditPrices from './pages/Price/Edit'
import PostPrice from './pages/Price/Post'
import Reservations from './pages/Reservations/reservations'
import AddReservation from './pages/Reservations/CreateReservation'
import EditReservation from './pages/Reservations/EditReservation'
import NotFound from './components/NotFound'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
    this.checkLogin = () => {
      if (localStorage.getItem('token')) {
        this.setState({ isLogin: true })
      } else {
        this.setState({ isLogin: false })
      }
    }
  }
  componentDidMount() {
    this.checkLogin()
  }
  render() {
    return (
      <BrowserRouter>
        <Router history={history}>

          {this.props.auth.isLogin ?
            <Navbar isLogin={this.props.auth.isLogin} check={() => this.checkLogin()} />
            : <NavbarMenu isLogin={this.props.auth.isLogin} check={() => this.checkLogin()} />}

          <Switch>
            <Route path='/' exact render={(props) => <Home {...props} />} />
            <Route path='/login' render={(props) => <Login {...props} check={() => this.checkLogin()} />} exact />
            <Route path='/dashboard' render={(props) => <Dashboard {...props} />} exact></Route>
            <Route path='/users' exact render={(props) => <Users {...props} />} />
            <Route path='/users/userdetail/:id' exact render={(props) => <EditUser {...props} />} />
            <Route path='/agents' exact render={(props) => <Agents {...props} />} />
            <Route path='/agents/add' exact render={(props) => <CreateAgents {...props} />} />
            <Route path='/agents/:id' exact render={(props) => <EditAgents {...props} />} />
            <Route path='/bus' exact render={(props) => <Buses {...props} />} />
            <Route path='/bus/add' exact render={(props) => <CreateBus {...props} />} />
            <Route path='/bus/:id' exact render={(props) => <EditBus {...props} />} />
            <Route path='/route' exact render={(props) => <Routes {...props} />} />
            <Route path='/route/add' exact render={(props) => <CreateRoutes {...props} />} />
            <Route path='/route/:id' exact render={(props) => <EditRoute {...props} />} />
            <Route path='/schedule' exact render={(props) => <Schedules {...props} />} />
            <Route path='/schedule/add' exact render={(props) => <CreateSchedules {...props} />} />
            <Route path='/schedule/:id' exact render={(props) => <EditSchedules {...props} />} />
            <Route path='/price' exact render={(props) => <Prices {...props} />} />
            <Route path='/price/add' exact render={(props) => <PostPrice {...props} />} />
            <Route path='/price/:id' exact render={(props) => <EditPrices {...props} />} />
            <Route path='/reserve' exact render={(props) => <Reservations {...props} />} />
            <Route path='/reserve/add/:id' exact render={(props) => <AddReservation {...props} />} />
            <Route path='/reserve/:id' exact render={(props) => <EditReservation {...props} />} />
            <Route path='/reserve/board/add' exact render={(props) => <AddBoard {...props} />} />
            <Route path='/reserve/board/:id' exact render={(props) => <EditBoard {...props} />} />
            <Route path="*" exact render={(props) => <NotFound {...props} />} />
          </Switch>

        </Router>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  console.log('state', state.auth)
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(App)

