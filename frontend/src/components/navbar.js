import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () =>{
    return (
        <>
       
        <div className='flex justify-around h-14 py-4'>
            <div>
                <h2>H<span>uggz</span></h2>
            </div>
            
            <div className='flex gap-4 mr-10'>
                <Link to='/'>
                <p >Home</p>
                </Link>
           
        <p >Connect</p>
        <p>Journal</p>
        <p>Community</p>
        <p>Profile</p>
            </div>
       


        </div>
        </>
    )
}

export default Navbar