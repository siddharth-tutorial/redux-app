import React from 'react'
import { Route, Routes } from 'react-router';
import Header from '../src/pages/Header'
import Home from '../src/pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './pages/Product';
import Movie from './pages/Movie';
import Blog from "./pages/Blog"
import Cart from './pages/Cart';
function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/movie' element={<Movie/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  )
}

export default App; 