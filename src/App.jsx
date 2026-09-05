
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import CompleteProfile from './pages/Auth/CompleteProfile'
import AppLayout from './Layouts/AppLayout'
import Landing from './pages/Landing/Landing'
import Customers from './pages/Customers/Customers'
import { Toaster } from 'react-hot-toast'
import Appointments from './pages/Appointment/Appointments'
import Wallet from './pages/wallet/Wallet'
import Messages from './pages/messages/Messages'
import SupportPage from './pages/support/SupportPage'
import ProtectedRoute from './components/common/ProtectedRoute'
import Services from './pages/salonservices/Services'

function App() {

const ROLES = {
  ADMIN: 1,
  OWNER: 2,
  CUSTOMER: 3,
};


  return (
    <>
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register/:salonId" element={<Register />} />




        <Route path="/panel" element={<AppLayout />} >
          <Route path="profile" element={<CompleteProfile />} />
          <Route
            path="customers"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.OWNER]}>
                <Customers />
              </ProtectedRoute>
            }
          />

          <Route path="appointments" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.OWNER]}>
              <Appointments />
            </ProtectedRoute>
          } />
          <Route path="messages" element={<Messages />} />
          <Route path="services" element={<Services />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="support" element={<SupportPage />} />
        </Route>


      </Routes>
    </>

  )
}

export default App
