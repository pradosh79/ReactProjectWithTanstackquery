import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCreate from '../pages/cms/product_create/index'
import ProductList from '../pages/cms/product_list/index'
import Updateproduct from '../pages/cms/product_update/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

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
            <Route path="/cms/product_create" element={<ProductCreate />} />
            <Route path="/cms/product_list" element={<ProductList/>} />
            <Route path= "/cms/update_product/:product_id" element={<Updateproduct/>}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
