import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Detail from './Component/Blog/Detail';
import Blog from './Component/Blog/Blog';
import Index1 from './Member/Index1';
import Update from './Member/account/Update';
import Home from './Layout/Home';
import AddProduct from './Member/My product/AddProduct';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<Home/>} />
          <Route path='/blog/list' element={<Blog/>}/>
          <Route path='/blog/detail/:id' element={<Detail/>}/>
          <Route path='/Member/login/' element={<Index1/>}/>
          <Route path='/account/Update' element={<Update/>}/>
          <Route path='/myproduct' element={<AddProduct/>}/>
        </Routes>
      </App>
    </Router>
    {/* <App/> */}
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
