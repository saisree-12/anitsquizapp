import React from 'react'
import { Parallax , Background} from 'react-parallax'
import anits from '../Assets/temp.mp4'
import NavbarComp from './NavbarComp'
import { Fade } from 'react-awesome-reveal'
import { Card } from 'react-bootstrap'
import Teach from '../Assets/teacher.jpg'
import Student from '../Assets/homestudent.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination } from "swiper";
import {MdOutlineAlternateEmail} from 'react-icons/md'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Home from './Home'



const HomeTemp = () => {
    console.log(window.history);
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
        navigation('/faculty/fdash',{state:{flag:true}})
    } 
    else{
      window.location.replace('/flogin')
    }
} 

return (
    <>
    <div style={{width:"100vw"}} className='laptop'>
        <Parallax strength={500}>
            <Background>
                <video style={{objectFit:"cover"}} className='content homevideo' src={anits} autoPlay muted loop></video>
            </Background>
            <NavbarComp color = {'dark'} className={'homenav'} textColor = {'text-white'}/> 
            <div className='content padd'>
                <div className='text-content'><span className='fontstyle'>Welcome to Our Quiz Portal</span><br/>Anil Neerukonda Institute of Technology and Sciences</div>
            </div>
        </Parallax> 
        <Parallax strength={600}>
            <div className='content'> 
                <div className='d-flex flex-column justify-content-center align-items-center' style={{gap:100,marginTop:200}}>
                    <Fade cascade damping={.1} duration={2000}>
                        <p className='h1' style={{fontFamily:"QuickSand",fontSize:"45px",fontWeight:900}}>The Ultimate Quiz Experience</p>
                        <div className='d-flex justify-content-center flex-wrap text-white' style={{gap:60}}>
                        <Card
                                className='shadow animicard'
                                style={{
                                    width:"400px",
                                    height:"400px",
                                    background:"linear-gradient(to right,#5433FF,#20BDFF)"
                                }}
                            >
                                <Card.Header>
                                    <p className='h1' style={{fontFamily:"Expletus Sans"}}>Challenging Questions</p>
                                </Card.Header>
                                <Card.Body>
                                    <ul className='d-flex flex-column' style={{listStyle:'number',gap:20}}>
                                        <li>
                                            <Card.Text className = "text-light">What is Structure in C language?</Card.Text>
                                        </li>
                                        <li>
                                            <Card.Text className = "text-light">What is Polymorphism in Java Programming?</Card.Text>
                                        </li>
                                        <li>
                                            <Card.Text className = "text-light">What is a Trigger in Database Management Systems? </Card.Text>
                                        </li>
                                        <li>
                                            <Card.Text className = "text-light">What is Artificial Neural Network in Deep Learning?</Card.Text>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                            <Card
                                className=' shadow animicard'
                                style={{
                                    width:"400px",
                                    height:"500px",
                                    // background:"linear-gradient(to bottom,#F2994A,#F2C94C)"
                                    background:"linear-gradient(to bottom,#11998e,#38ef7d)"

                                }}
                            >
                                <Card.Header>
                                    <p className='h1' style={{fontFamily:"Expletus Sans"}}>Expertly Curated Quizzes</p>
                                </Card.Header>
                                <Card.Body>
                                    <ul className='d-flex flex-column' style={{listStyle:'circle',gap:20}}>
                                        <li>
                                            <Card.Text className = "text-light">Our quizzes are created by experts in their respective fields to ensure accuracy and relevance to current events.</Card.Text>
                                        </li>
                                        <li>
                                            <Card.Text className = "text-light">Each quiz is tailored to provide a unique learning experience, combining education and entertainment.</Card.Text>
                                        </li>
                                        <li>
                                            <Card.Text className = "text-light">Regularly updated quizzes with the latest information, trends, and developments. Stay current, test your knowledge, and engage with relevant content.</Card.Text>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                            <Card
                                className=' shadow animicard'
                                style={{
                                    width:"400px",
                                    height:"600px",
                                    background:"linear-gradient(to bottom,#F2994A,#F2C94C)"
                                }}
                            >
                                <Card.Header>
                                    <p className='h1' style={{fontFamily:"Expletus Sans"}}>Responsibilities Supplied</p>
                                </Card.Header>
                                <Card.Body>
                                    <ul className='d-flex flex-column h4' style={{listStyle:'circle',gap:20}}>
                                        <li>
                                            <p>Faculty Can </p>
                                            <ul className='d-flex flex-column h4' style={{listStyle:"square",gap:10}}>
                                                <li>
                                                    <Card.Text className = "text-light">Track Student Performance.</Card.Text>
                                                </li>
                                                <li>
                                                    <Card.Text className = "text-light">Assign Quizzes.</Card.Text>
                                                </li>
                                                <li>
                                                    <Card.Text className = "text-light">Post materials for reference.</Card.Text>
                                                </li>
                                                <li>
                                                    <Card.Text className = "text-light">Rehost the previous Quizzes.</Card.Text>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <p>Student Can </p>
                                            <ul className='d-flex flex-column h4' style={{listStyle:"square",gap:10}}>
                                                <li>
                                                    <Card.Text className = "text-light">Attempt the Quizzes.</Card.Text>
                                                </li>
                                                <li>
                                                    <Card.Text className = "text-light">Check the key of the Quiz and work on weak points.</Card.Text>
                                                </li>
                                                <li>
                                                    <Card.Text className = "text-light">Access the materials posted.</Card.Text>
                                                </li>
                                                <li>
                                                    <Card.Text className = "text-light">have great Learning experience.</Card.Text>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </div>
                    </Fade>
                </div>
            </div>
        </Parallax>
        <Parallax strength={600}>
            <Background>
                <img src={Teach} alt='Teacher' style={{width:"100vw",objectFit:"cover",marginTop:"250px",height:"800px"}}></img>
            </Background>
            <div className='content'>
                <p className='h4 text-content' style={{marginLeft:"200px"}}>Professors are knowledgeable experts who shape minds in higher education. They engage students in critical thinking, foster curiosity, and mentor them for success. Through teaching and research, professors inspire learning, advance knowledge, and leave a lasting impact on students.</p>
                <button className='btn btn-lg text-content text-white' style={{marginTop:"200px",width:"180px",marginLeft:"500px",borderRadius:"30px",backgroundColor:"#ea7e36",fontFamily:"QuickSand",fontSize:"20px"}} onClick={Clicked}>Faculty</button>
            </div>
        </Parallax>
        <Parallax strength={600} style={{marginTop:"200px"}}>
            <Background>
                <img src={Student} alt='Teacher' style={{width:"100vw",objectFit:"cover",marginTop:"250px",height:"800px"}}></img>
            </Background>
            <div className='content'>
                <p className='h4 text-content' style={{marginLeft:"50px"}}>Unleash the power of student insights! Dive deep into their academic prowess, passions, and progress. Unlock a treasure trove of knowledge, discovering their strengths, areas to enhance, and untapped potential. With a keen eye on student growth, our system illuminates a path to success, paving the way for tailored guidance and educational excellence.</p>
                <button className='btn btn-lg text-content text-white' style={{marginTop:"200px",width:"180px",borderRadius:"30px",backgroundColor:"#ea7e36",fontFamily:"QuickSand",fontSize:"20px"}} onClick={Slogin}>Student</button>
            </div>
        </Parallax>
        <Fade cascade duration={3000}>
            <div className='text-center' style={{fontFamily:"QuickSand",fontWeight:"800",marginTop:'200px'}}>
                <Fade cascade duration={1500} damping={1}>
                    <p style={{fontFamily:"QuickSand",fontWeight:"900",fontSize:"40px",marginBottom:"100px"}}>Frequently Asked Questions...</p>
                </Fade>
            <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
            rotate: 50,
            stretch: -60,
            depth: 100,
            modifier: 1,
            slideShadows: true,
            }}
            pagination={true} 
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
        > 
            <SwiperSlide className='d-flex flex-column justify-content-start p-4 align-items-center shadow rounded rounded-2' style={{width:'350px',height:'400px',gap:20,background:"linear-gradient(to bottom,#F2994A,#F2C94C)"
}} >
                    <h5 className='text-white text-start'>Q. How is the quiz submission handled if the stipulated time runs out without manual intervention?</h5>
                    <h5 className='text-white text-start'>The quiz will automatically end at the stipulated time. It's important to complete and submit your responses within the given timeframe to ensure they are recorded.</h5>
                </SwiperSlide>
                <SwiperSlide className='d-flex flex-column justify-content-start p-4 align-items-center shadow rounded rounded-2' style={{width:'350px',height:'400px',gap:20,background:"linear-gradient(to bottom,#F2994A,#F2C94C)"
}} >
                    <h5 className='text-white text-start'>Q. Can I retake a quiz on a quiz website?</h5>
                    <h5 className='text-white text-start'>Once you've clicked that submit button, there's no going back! You cannot retake the quiz unless your faculty opens the door to a retake. If you're hoping for a second chance, it's in the hands of your faculty to provide the opportunity. Stay attentive and make every response count!</h5>
                </SwiperSlide>
                <SwiperSlide className='d-flex flex-column p-4 justify-content-start align-items-center shadow rounded rounded-2' style={{width:'350px',height:'400px',gap:20,background:"linear-gradient(to bottom,#F2994A,#F2C94C)"
}} >
                    <h5 className='text-white text-start'>Q. How are quiz scores calculated on a quiz website?</h5>
                    <h5 className='text-white text-start'>Each question's worth holds the key. Marks granted, as per their command, create the score, shaping where you stand. So tread carefully, don't leave it to chance, for your grade's dance lies in their scoring stance.</h5>
                </SwiperSlide>
                <SwiperSlide className='d-flex flex-column justify-content-center p-4 align-items-center shadow rounded rounded-2' style={{width:'350px',height:'400px',gap:20,background:"linear-gradient(to bottom,#F2994A,#F2C94C)"
}} >
                    <h5 className='text-white text-start'>Q. Can I share my quiz results on social media?</h5>
                    <h5 className='text-white text-start'>Confidential scores, no sharing aloud! Limited to institution, only you and faculty are allowed. Your score remains private within these walls. So rest assured, your results stay within the institute's domain, ensuring privacy and keeping your score retain.</h5>
                </SwiperSlide>
                </Swiper>
            </div>
        </Fade>
        <Parallax strength={600}>
            <div className='footer'>
                <span className='text-white'>&copy; 2023 Quiz Portal. All rights reserved. | Made with <span role='img' aria-label='love'>❤️</span> by Quiz Portal Team <p>Reach Us <MdOutlineAlternateEmail/> : anitsquiz01@gmail.com</p></span>
            </div>
        </Parallax>
    </div>
    <div className='mobile' style={{minHeight:"100vh"}}>
        <Home />
    </div>
    </>
)}

export default HomeTemp