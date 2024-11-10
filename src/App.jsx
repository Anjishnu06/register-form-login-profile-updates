import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Register} from './components/Register';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
