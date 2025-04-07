import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCreate from '../pages/cms/product_create/index'
import ProductList from '../pages/cms/product_list/index'
import ProductEdit from '../pages/cms/product_edit/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Registration from '../pages/auth/registration/index';
import Login from '../pages/auth/login';
import Verify_otp from '../pages/auth/verify_otp';
import Update_password from '../pages/auth/password/update_password';
import Forgot_password from '../pages/auth/forgot_password/forgot_password';

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },

      }}
    />
        <Router>
          <Routes>
          <Route path= "/auth/login" element= {<Login/>} />
            <Route path= "/auth/registration" element= {<Registration/>} />
            <Route path= "/auth/forgot_password" element= {<Forgot_password/>} />
            <Route path= "/auth/update_password" element= {<Update_password/>} />
            <Route path="/cms/product_create" element={<ProductCreate />} />
            <Route path="/cms/product_list" element={<ProductList/>} />
            <Route path= "/cms/product_edit/:product_id" element={<ProductEdit/>}/> 
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
