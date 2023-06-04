import "./App.css";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameDetails from "./components/gamedetails/GameDetails";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/gamedetails" element={<GameDetails/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
