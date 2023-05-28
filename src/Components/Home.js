import React from 'react'
import NavbarComp from './NavbarComp'
import Header from './Header'

const Home = () => {
  return (
    <>
      <div className='home-bg' style={{backgroundColor:"#E0FFFF",minHeight:"100vh",minWidth:"100vw"}}>
        <div className='home-innbg'>
        <NavbarComp/>
        <Header className='mt-5'/>
      </div> 
      </div> 
    </>
  )
}

export default Home