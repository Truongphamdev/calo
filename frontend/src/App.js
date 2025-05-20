import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';
import { Register } from './component/Register';
import { Login } from './component/Login';
import Home from './component/Home';
import { Header } from './component/Header';
import { Footer } from './component/Footer';
import { About } from './component/About';
import { Contact } from './component/Contact';
import { Analyze } from './component/Analyze';
import { Privaty } from './component/Privaty';

function Layout() {
  const location = useLocation();
  const noHeaderRoutes = ["/login", "/register"]; // Các trang không cần Header/Footer

  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/analyze' element={<Privaty><Analyze/></Privaty>}/>

        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>

      {!noHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
