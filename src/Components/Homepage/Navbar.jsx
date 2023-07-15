import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion';
import logoimg from '../Assets/Logo.png'
import './Navbar.scss'

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
  return (
    <div>
          <nav className='app__navbar'>
        <div className="app__navbar-logo">    
        <img src={logoimg} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {['home', 'about us', 'contact Us','partners'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
            <div className='d-flex justify-end items-end gap-2 d-none d-none d-md-flex'>
            <Link to='../Signup'className='mainbtn col-4 col-md-6 py-2 px-3'>Register</Link>
            <Link to='../Login' className='mainbtn col-4 col-md-5 py-2 px-3'>Login</Link>
            </div>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {['home', 'about us', 'contact Us','partners'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
    </div>
  )
}

export default Navbar