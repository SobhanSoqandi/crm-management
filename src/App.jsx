
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import CompleteProfile from './pages/Auth/CompleteProfile'
import AppLayout from './Layouts/AppLayout'
import Landing from './pages/Landing/Landing'
import Customers from './pages/Buesness/Customers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

function App() {


  const queryClient = new QueryClient()
  return (

    <BrowserRouter>
     <Toaster
          position="top-left"
          reverseOrder={false}
        />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />


          <Route path="panel" element={<AppLayout />} >
            <Route path="complete" element={<CompleteProfile />} />
            <Route path="customers" element={<Customers />} />
          </Route>


        </Routes>

      </QueryClientProvider>
    </BrowserRouter>

  )
}

export default App
