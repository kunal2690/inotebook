import About from "./components/About"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Login from "./components/Login";
import './App.css';
import Signup from "./components/Signup";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Notestate from "./context/notes/NotesState";




function App() {
  return (
    <>
      <div className="App">
        <Notestate>

          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Routes>
                <Route key="home" path="/" element={<Home />} />
                <Route key="about" path="/about" element={<About />} />
                <Route key="signup" path="/signup" element={<Signup />} />
                <Route key="login" path="/login" element={<Login />} />
              </Routes>
            </div>

          </BrowserRouter>
        </Notestate>

      </div>
    </>
  );
}

export default App;
