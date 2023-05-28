import React from 'react'
import NavbarComp from './NavbarComp'
import img1 from '../Assets/anu1.jpg'
import img2 from '../Assets/fest-edit.jpg'
import { MDBCard,MDBCardBody,MDBCardTitle,MDBCardText,MDBCardImage,MDBInput,MDBTextArea,MDBRow,MDBCol } from 'mdb-react-ui-kit'
import { Fade } from 'react-awesome-reveal'
import axios from 'axios'

const About = () => {

    const [mail,setMail] = React.useState('')
    const [msg,setMsg] = React.useState('')

    const feedBack = (e) => {
        e.preventDefault();
        if(mail.length > 0 && msg.length > 0){
            axios.post('http://localhost:8888/feedback',{mail:mail,msg:msg})
            .then(res => {
                window.location.reload();
            })
        }
    }

  return (
    <>
        <div className='assign-bg' style={{minHeight:"100vh"}}>
            <div>
                <NavbarComp />
            </div>
            <div className='d-flex flex-column h-100' style={{marginBlock:'80px'}}>
                <Fade cascade duration={2000} direction='down'>
                <p className='h1 text-center p-5' style={{fontSize:'50px'}}>Meet the Team</p>
                </Fade>
                <div className='d-flex justify-content-center flex-wrap' style={{gap:'90px'}}>
                    <Fade cascade duration={2000} direction='left'>
                    <div>
                    <MDBCard style={{ maxWidth: '540px' }}>
                            <MDBRow className='g-0'>
                                <MDBCol md={4}>
                                <MDBCardImage src={img1} alt='...' fluid />
                                </MDBCol> 
                                <MDBCol md={8}>
                                <MDBCardBody>
                                    <MDBCardTitle>Anudeep Gude</MDBCardTitle>
                                    <MDBCardText>
                                    Meet Anudeep, a dynamic and enthusiastic team member embarking on their first web development project. With a fresh perspective and eagerness to learn, Anudeep is committed to delivering innovative solutions and contributing to the success of our team.
                                    </MDBCardText>
                                </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard> 
                    </div>
                    </Fade>
                    <Fade cascade duration={2000} direction='right'>
                    <div>
                        <MDBCard style={{ maxWidth: '540px' }}>
                            <MDBRow className='g-0'>
                                <MDBCol md={4}>
                                <MDBCardImage src={img2} alt='...' fluid/>
                                </MDBCol>  
                                <MDBCol md={8}>
                                <MDBCardBody>
                                    <MDBCardTitle>Gnana Sai Sree Mandarapu</MDBCardTitle>
                                    <MDBCardText>
                                    Introducing Gnana Sai Sree, a passionate and ambitious individual venturing into the realm of web development for the first time. With a thirst for knowledge and a drive to excel, Gnana Sai Sree brings a fresh perspective and a determined spirit to our team, ready to create impactful digital experiences.
                                    </MDBCardText>
                                </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard> 
                    </div>
                    </Fade> 
                </div>
                <p className='h1 text-center p-5 mt-5'>For any Queries..Reach us on...</p>
                <div className='d-flex justify-content-center mb-5'>
                    <div className='d-flex flex-column p-5' style={{width:'900px'}}>
                        <form >
                            <MDBInput label='Mail' id='mail' type='text' required onChange={(e) => setMail(e.target.value)}/><br></br>
                            <MDBTextArea label='Message' id='message' rows={3} className='msg' onChange={(e) => setMsg(e.target.value)}/> 
                        </form>
                        <button className='btn btn-success mt-5' onClick={feedBack}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default About
