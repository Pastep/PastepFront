import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from './pages/home'
import Nav from './components/nav'

function App() {
  return (
    <Router>
      <Nav />
      <Route path='/' exact component={Home}></Route>
    </Router>
  );
}

export default App;
