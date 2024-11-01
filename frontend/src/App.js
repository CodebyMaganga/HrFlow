
import './index.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home';
import Sidebar from './components/sidebar';


function App() {
  return (
    <div >

      <BrowserRouter>
      <div className='flex'>
      
      <Sidebar />


      <div>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      </div>
      

      </div>
      
      </BrowserRouter>
  
    </div>
  );
}

export default App;
