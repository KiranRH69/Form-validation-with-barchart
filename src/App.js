import React from 'react'
import { Route } from 'react-router-dom'
import { BrowserRouter as Router} from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Chart from './Chart'
import Form from './Form'

const App = () => {
  return (
   <Router>
  <Switch>
  <Route exact path="/" component={Form}/>
  <Route exact path="/chart" component={Chart}/>
  </Switch>
    
    </Router>
    

  )
}

export default App
