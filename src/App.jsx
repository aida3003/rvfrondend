
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom'

import Medecin from "./pages/Medecin/Medecin"
import Rv from "./pages/Rv/Rv"
import Patient from "./pages/Patient/Patient" 
import SignUp from './composants/SignUp/SignUp'
import Login from './composants/Login/Login'
import Index from './pages/Index/Index'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/index" element={<Index />} />
        <Route path="/medecin" element={<Medecin />} />
        <Route path="/rv" element={<Rv />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
    </>
  )
}

export default App
