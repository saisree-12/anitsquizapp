import React from 'react'
import NavbarComp from './NavbarComp'
import { Fade } from 'react-awesome-reveal'

const Career = () => {
  return (
    <>
        <div className = 'assign-bg d-flex flex-column' style={{minHeight:"100vh",minWidth:"100vw"}}>
            <NavbarComp />
            <div className='d-flex m-auto'>
                <Fade cascade duration={2000}>
                <div className='career shadow'>
                <p className='h1' style={{fontFamily:"Expletus Sans",fontWeight:"500",fontSize:"40"}}>Thank You for showing your interest.!</p>
                <p className='h4' style={{fontFamily:"Expletus Sans",fontWeight:"200",fontSize:"40"}}>Welcome to our Career Page! We are thrilled to announce that exciting career opportunities will be available here very soon. Stay tuned for updates and be ready to embark on an incredible journey with us!</p>
                <p className='h3' style={{fontFamily:"Expletus Sans",fontWeight:"200",fontSize:"40"}}>Hope you are doing good 😊</p>
                <p className='float-end text-end h5' style={{fontFamily:"Expletus Sans",fontWeight:"200",fontSize:"40"}}>Best wishes from our Team ❤️</p>
                </div>
                </Fade>
            </div>
        </div>
    </>
  )
}

export default Career