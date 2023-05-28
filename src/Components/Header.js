import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import Teach from '../Assets/teacher.jpg'
import Student from '../Assets/homestudent.jpg'
import {MdOutlineAlternateEmail} from 'react-icons/md'

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple
} from 'mdb-react-ui-kit';

const Header = () => {
  const navigation = useNavigate()

  const Slogin = (e) => {
    e.preventDefault()
    if(Cookies.get('uname')!==undefined){
            navigation('/student/sdash',{state:{flag:true}})
    }else{
      window.location.replace('/slogin')
    }
}

const Clicked = (e) => {
  e.preventDefault();
    if(Cookies.get('process_id')!==undefined){
        window.location.replace('/faculty/fdash')
    } 
    else{
      window.location.replace('/flogin')
    }
} 

  return (
    <>
    <div className='d-flex justify-content-between mt-5'>
      <div className='home-text d-flex flex-column ' style={{gap:40}}>
        <Fade cascade damping={.2} direction='left' duration={2000}>
          <div>
            <label className='home-header ps-3'>Welcome to Our Quiz Portal</label>
          </div>
          <div>
            <label className='home-anits ps-3' style={{fontFamily:"Expletus Sans"}}>Anil Neerukonda Institute of Technology and Sciences</label>
          </div>
        {/* </Fade>
        <Fade cascade duration={3000} style ={{marginTop:"100px"}} direction = "right" damping = {.1}> */}
        <MDBCard className='animicard' style={{backgroundColor:"rgba(255,255,255,.7)"}}>
          <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
            <MDBCardImage src={Teach}fluid alt='...' />
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle>Faculty</MDBCardTitle>
            <MDBCardText>
            Professors are knowledgeable experts who shape minds in higher education. They engage students in critical thinking, foster curiosity, and mentor them for success. Through teaching and research, professors inspire learning, advance knowledge, and leave a lasting impact on students.
            </MDBCardText>
            <button className='btn text-light btn-sm' style={{width:"150px",borderRadius:"30px",backgroundColor:"#ea7e36",fontFamily:"QuickSand",fontSize:"20px"}} onClick={Clicked}>Login</button>
          </MDBCardBody>
        </MDBCard>
        <MDBCard className='shadow shadow-lg'>
          <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
            <MDBCardImage src={Student} fluid alt='...' />
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle>Student</MDBCardTitle>
            <MDBCardText>
            Unleash the power of student insights! Dive deep into their academic prowess, passions, and progress. Unlock a treasure trove of knowledge, discovering their strengths, areas to enhance, and untapped potential. With a keen eye on student growth, our system illuminates a path to success, paving the way for tailored guidance and educational excellence.
            </MDBCardText>
            <button className='btn text-light btn-sm' style={{width:"150px",borderRadius:"30px",backgroundColor:"#ea7e36",fontFamily:"QuickSand",fontSize:"20px"}} onClick={Slogin}>Login</button>
          </MDBCardBody>
        </MDBCard>
        <div className='footer'>
          <span className='text-white'>&copy; 2023 Quiz Portal. All rights reserved. | Made with <span role='img' aria-label='love'>❤️</span> by Quiz Portal Team <p>Reach Us <MdOutlineAlternateEmail/> : anitsquiz01@gmail.com</p></span>
        </div> 
        </Fade>
      </div>
    </div>
    </>
  )
}

export default Header