import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Hello Pastep!</h1>
      <Router>
        <Route path='/' exact><h1>HomePage</h1></Route>
      </Router>
    </div>
  );
}

export default App;
