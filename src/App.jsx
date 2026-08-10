
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

function App() {


  return (
    <>
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />


        <Route path="panel" element={<AppLayout />} >
          <Route path="profile" element={<CompleteProfile />} />
          <Route path="customers" element={<Customers />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="messages" element={<Messages />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="support" element={<SupportPage />} />
        </Route>


      </Routes>
    </>

  )
}

export default App
