import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Register} from './Register';
import { Login } from './Login';
import { Home } from './Home';
import { Profile } from './Profile';
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
