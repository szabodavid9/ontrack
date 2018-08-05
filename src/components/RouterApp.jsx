import React, {Component} from 'react'
import App from './App'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

class RouterApp extends Component {

  render () {
    console.log(this.props);
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/active-page/1'/>}/>
          <Route exact path='/active-page/:activepage' component={App}/>          
        </Switch>
      </Router>
    )
  }
}

export default RouterApp