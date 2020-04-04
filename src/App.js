import React from 'react'
import {Row} from 'reactstrap'
import {BrowserRouter, Router, Switch, Route} from 'react-router-dom'
import history from './utils/history'
import { connect } from 'react-redux'

/* Custom Component */
import Navbar from './components/Navbar'
import NavbarMenu from './components/NavbarMenu'
import SidebarNone from './components/SidebarNone'

/* Pages */
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users/Users'
import Agents from './pages/Agents/Agent'
import CreateAgents from './pages/Agents/Post'
import EditAgents from './pages/Agents/Edit'
import Buses from './pages/buses/buses'
import EditBus from './pages/buses/Edit'
import CreateBus from './pages/buses/CreateBus'
import Routes from './pages/Route/Routes'
import EditRoutes from './pages/Route/Edit'
import Schedules from './pages/Schedule/Schedules'
import EditSchedules from './pages/Schedule/Edit'
import CreateSchedules from './pages/Schedule/CreateSchedule'
import Prices from './pages/Price/Prices'
import EditPrices from './pages/Price/Edit'
import PostPrice from './pages/Price/Post'
import NotFound from './components/NotFound'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isLogin: false
    }
    this.checkLogin = () => {
      if(localStorage.getItem('token')){
        this.setState({isLogin: true})
      }else{
        this.setState({isLogin: false})
      }
    }
  }
  componentDidMount(){
    this.checkLogin()
  }
  render(){
    return(
      <BrowserRouter>
        <Router history={history}>

          {this.state.isLogin ? 
          <Navbar isLogin={this.state.isLogin} check={()=>this.checkLogin()} /> 
          : <NavbarMenu isLogin={this.state.isLogin} check={()=>this.checkLogin()} />} 
            
              <Switch>
                <Route path='/' exact render={(props)=><Home {...props}/>} />
                <Route path='/login' render={(props)=><Login {...props} check={()=>this.checkLogin()}  />} exact />
                <Route path='/dashboard' render={(props)=><Dashboard {...props} />} exact></Route>
                <Route path='/users' exact render={(props)=><Users {...props}/>} />
                <Route path='/agents' exact render={(props)=><Agents {...props}/>} />
                <Route path='/agents/add' exact render={(props)=><CreateAgents {...props}/>} />
                <Route path='/agents/:id' exact render={(props)=><EditAgents {...props}/>} />
                <Route path='/bus' exact render={(props)=><Buses {...props}/>} />
                <Route path='/bus/add' exact render={(props)=><CreateBus {...props}/>} />
                <Route path='/bus/:id' exact render={(props)=><EditBus {...props}/>} />
                <Route path='/route' exact render={(props)=> <Routes {...props}/>} />
                <Route path='/route/:id' exact render={(props)=> <EditRoutes {...props}/>} />
                <Route path='/schedule' exact render={(props)=> <Schedules {...props}/>} />
                <Route path='/schedule/add' exact render={(props)=> <CreateSchedules {...props}/>} />
                <Route path='/schedule/:id' exact render={(props)=> <EditSchedules {...props}/>} />
                <Route path='/transaction' exact render={(props)=> <Prices {...props}/>} />
                <Route path='/transaction/add' exact render={(props)=> <PostPrice {...props}/>} />
                <Route path='/transaction/:id' exact render={(props)=> <EditPrices {...props}/>} />
                <Route path="*" exact render={(props)=> <NotFound {...props}/>} />
              </Switch>
        
        </Router>
      </BrowserRouter>
    )
  }
}


export default App

