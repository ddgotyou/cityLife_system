import './App.css';
import BaseRouter from './route/routes'
import { BrowserRouter as Router, Routes as Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <BaseRouter></BaseRouter>
    </Router>
  );
}

export default App;
