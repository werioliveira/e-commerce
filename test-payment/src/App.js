import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Pay from './Pay.jsx'
import Success from './Success'

const App = () =>{
    return(
        <Router>
            <Switch>
            <Route path="/pay">
                <Pay />
            </Route>
            <Route path="/success">
                <Success />
            </Route>
            </Switch>
        </Router>
    )
}
export default App
