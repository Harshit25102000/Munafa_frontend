import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
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
     
     </Routes>
      </BrowserRouter>
  
  );
}

export default App;