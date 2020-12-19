import "./App.css";
import LandingPage from "./component/LandingPage";
import Authentication from './component/Authentication'
import Register from './utilities/Register';
import Home from './component/Home'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {useStateValue} from './global/StateProvider'



function App() {

  const [{user}] = useStateValue();

  return (
    <div className="App">
      
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/authentication">
              <Authentication />
            </Route>
            <Route  exact path="/authentication/register">
            <Register />
            </Route>
            <Route  exact path="/home">

              {
                user ? <Home/> : <LandingPage/> 
              }

            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
