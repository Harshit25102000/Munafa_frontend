import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/signup';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
     <Routes>
     <Route path="/" element={<Login />}/>
     <Route path="/signup" element={<Signup />}/>
     <Route path="/home" element={<Home />}/>
     <Route path="/portfolio" element={<Portfolio />}/>
     
     </Routes>
      </BrowserRouter>
  
  );
}

export default App;