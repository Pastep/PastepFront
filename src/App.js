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
      <Router>
        <Route path='/' exact><h1>خانه</h1></Route>
      </Router>
    </div>
  );
}

export default App;
