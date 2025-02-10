import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Profile from './pages/Profile';
import Register from './pages/Register';
import RegistrationSuccess from './pages/RegistrationSuccess';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/filled" element={<RegistrationSuccess />} />
    </Routes>
    </>
  );
}

export default App;