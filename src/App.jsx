import { Route, Routes } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/products" element={<Products />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App