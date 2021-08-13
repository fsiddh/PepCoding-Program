import './App.css';
import Signup from './Components/Signup';
import AuthProvider from './Context/AuthProvider';
import Login from './Components/Login';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Feed from './Components/Feed'
function App() {
  return (
   <Router>
     <AuthProvider>
     <Switch>
       <PrivateRoute exact path='/' component={Feed}/>
       <Route path='/login' component={Login}/>
       <Route path='/signup' component={Signup}/>
     </Switch>
     </AuthProvider>
   </Router>
  );
}

export default App;
