import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './components/Registration';
import LoginPage from './components/Login';
import ManufacturerLandingPage from './components/Manufacturer';
import TransporterLandingPage from './components/Transporter';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/manufacturer" element={<ManufacturerLandingPage />} />
        <Route exact path="/messages" element={<LandingPage />} />
        <Route exact path="/transporter" element={<TransporterLandingPage />} />
      </Routes>
      
    </Router>
  );
};

export default App;

