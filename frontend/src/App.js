
import './index.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home';
import Sidebar from './components/sidebar';
import HRCentral from './pages/HRCentral';


function App() {
  return (
    <div >

      <BrowserRouter>
      <div className='flex h-[1400px]'>
      
      <Sidebar className=""/>


      <div class>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/HRCentral' element={<HRCentral />} />
      </Routes>
      </div>
      

      </div>
      
      </BrowserRouter>
  
    </div>
  );
}

export default App;
