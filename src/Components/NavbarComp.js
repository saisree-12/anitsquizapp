import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap'
import Logo from '../Assets/th.webp'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const NavbarComp = (params) => {

const navigate = useNavigate()
const Flogin = (e) => {
  e.preventDefault()
  if(Cookies.get('process_id')!==undefined){
    navigate('/faculty/fdash')

}else{
    navigate('/flogin')
}
}

const Slogin = () => {
  if(Cookies.get('sprocess_id')===undefined){
    navigate('/slogin')
  }else{
  navigate('/student/sdash')
}
}

const Logout = () => {
  Cookies.remove('uname')
  Cookies.remove('process_id')
  Cookies.remove('keycrypt')
  Cookies.remove('pwd')
  Cookies.remove('auth')
  window.location.replace('/')
}
   

  return (
    <>
    <div className='d-flex justify-content-center'>
      <div style={{width:'80vw',zIndex:100,backgroundColor:"rgba(0,0,0,.2)",marginInline:"auto",marginBlock:20,borderRadius:30,position:"fixed",top:0}}>
        <Navbar variant={'dark'} expand="sm" className='shadow shadow-0 h5 text-dark pt-3' style={{fontFamily:"QuickSand"}}>
            <Container className='rb'>
            <Navbar.Brand href='/'> 
            <img
              alt="Anits Logo"
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top rounded-5"
            />&nbsp;&nbsp;&nbsp;&nbsp;Anits Quiz
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle> 
            <Navbar.Collapse>
                <Nav className='ms-auto'>
                    <Nav.Item style={{cursor:"pointer"}} onClick={Slogin} className={`text-white  m-2`}>Student</Nav.Item>
                    <Nav.Item style={{cursor:"pointer"}} onClick={Flogin} className={`text-white  m-2`}>Faculty</Nav.Item>
                    <Nav.Item style={{cursor:"pointer"}} className={`text-white  m-2`} onClick={() => navigate('/career')}>Career</Nav.Item>
                    <Nav.Item style={{cursor:"pointer"}} onClick = {() => navigate('/about')} className={`text-white  m-2`}>About</Nav.Item>
                    {(Cookies.get('uname')!==undefined || Cookies.get('uname')!==undefined)?<Nav.Item style={{cursor:"pointer"}} className={`text-white  m-2`} onClick={Logout}>Logout</Nav.Item>:<></>}
                </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        </div>
    </> 
  )
}

export default NavbarComp 