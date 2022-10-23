import React from 'react';
// adds the tilt package
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'

// created a Logo pure function
const Logo = () => {
     return (
        // wraps everything in a div and adds tacyons 
  <div className='ma4 mt0'>
    {/* using the tilt package code from the documentation and customising the logo */}
       <Tilt className='br2 shadow-2' style={{height: '150px', width: '150px'}}>
         <div style={{ height: '150px', backgroundColor: 'Tilt', width: '150px' }}>
         <img src={brain} alt='logo'/>
         </div>
      </Tilt>
   </div>
     )
}

export default Logo;