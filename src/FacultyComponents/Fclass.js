import NavbarComp from '../Components/NavbarComp'
import {MDBBtn,MDBInput } from 'mdb-react-ui-kit'
import Form from 'react-bootstrap/Form';
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loading from '../Components/Loader'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

const Fclass = () => {
    //eslint-disable-next-line no-unused-vars
    const [res,setRes] = React.useState([
        {sname:'Student Details',text:'View the Details of the Students',body:'Resume.jpg'},
        {sname:'Assign a Quiz',text:'Know the students strength',body:'quiz1.jpg'},
        {sname:'Post Notes',text:'dump the material to students',body:'pdf.jpg'},
        {sname:'Update hosted quiz',text:'You can modify or update the hosted quizes',body:'update.jpg'}
    ])
    const [isLoading,setLoading] = React.useState(true)
    const [quizName,setquizName] = React.useState('')
    const [topicName,settopicName] = React.useState('')
    const [quizDate,setquizDate] = React.useState('')
    const [quizTime,setquizTime] = React.useState('')
    const [duration,setDuration] = React.useState('')
    const [mpq,setMpq] = React.useState('')
    const [quizId,setquizId] = React.useState('')

    const [quizNumber,setquizNumber] = React.useState('')

    const Location = useLocation();
    const navigate = useNavigate();
    const className = Location.state.className;
    const subName = Location.state.subName;
    const classId = Location.state.classId;
    const subId = Location.state.subId;
    if(Cookies.get('process_id')===undefined){
    navigate('/flogin')
    }  
    console.log(window.history);
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        },3000)
        //eslint-disable-next-line
    },[])
    const Clicked = (index) => {
        // e.preventDefault();
        if(index === 0) { 
            navigate('/faculty/myclass/student-details',{state:{classId:classId,subId:subId,className:className,subName:subName}}) 
            window.history.pushState({classId:classId,subId:subId,className:className,subName:subName},'/faculty/myclass/student-details'   );  
        } 
        if(index===1){ 
            document.getElementById('pop').style.visibility = 'visible';
            document.getElementById('pop').style.backdropFilter = 'blur(15px)';
            document.getElementById('whole').style.filter = 'blur(15px)';
            document.getElementById('pop-out').style.visibility = 'visible';
        } 
        if(index ===2) {
            navigate('/faculty/myclass/post-notes',{state:{classId:classId,subId:subId}}) 
        } 
        if(index===3){ 
            document.getElementById('pop1').style.visibility = 'visible';
            document.getElementById('pop1').style.backdropFilter = 'blur(5px)';
            document.getElementById('whole').style.filter = 'blur(15px)';
            document.getElementById('pop1-out').style.visibility = 'visible';
        } 
    }

    const ClosePop = () => {
        document.getElementById('pop').style.visibility = 'hidden';
        document.getElementById('pop').style.backdropFilter = 'none';
        document.getElementById('pop-out').style.visibility = 'hidden';
        document.getElementById('whole').style.filter = 'blur(0px)';
    }

    const ClosePop1 = () => {
        document.getElementById('pop1').style.visibility = 'hidden';
        document.getElementById('pop1').style.backdropFilter = 'none';
        document.getElementById('pop1-out').style.visibility = 'hidden';
        document.getElementById('whole').style.filter = 'blur(0px)';
    }

    const Select = () => {
        const yr = new Date().getFullYear().toString();
        var quizId = yr.substring(2,4)+'-'+classId+'-'+subId+'-q'+quizNumber;
        quizId=quizId.replaceAll(' ','_');
        navigate('/faculty/myclass/assignquiz/select-ques',{state:{classId:classId,quizId:quizId,subName:subName,quizName:quizName,topicName:topicName,quizDate:quizDate,quizTime:quizTime,duration:parseInt(duration),mpq:parseInt(mpq),quizNumber:quizNumber,subId:subId,selectFlag:0}})
    } 
    const Add = () => {
        const yr = new Date().getFullYear().toString();
        var quizId = yr.substring(2,4)+'-'+classId+'-'+subId+'-q'+quizNumber;
        quizId=quizId.replaceAll(' ','_');
        navigate('/faculty/myclass/assignquiz/add-ques',{state:{classId:classId,quizId:quizId,subName:subName,quizName:quizName,topicName:topicName,quizDate:quizDate,quizTime:quizTime,duration:parseInt(duration),mpq:parseInt(mpq),quizNumber:quizNumber,subId:subId,addFlag:0}})
    } 
    const Update = (e) => {
        e.preventDefault();
        axios.post('https://anitsquiz.onrender.com/update-quiz',{quizId:quizId,quizDate:quizDate,quizTime:quizTime,duration:duration}).then((res) => {
        })
            navigate('/faculty/fdash')
    }  
return (
    <> 
    <div className='d-flex fclass flex-column fclass-bg' style={{minHeight:"100vh",background:"#d3dde3"}}>
        <div className='w-100'> 
            <NavbarComp/>
        </div> 
        {isLoading?<Loading />:
        <div className='mb-2 ' id='whole'>
            <div className='pb-2 p-5 m-5'>
            <p className='h1 text-center text-dark' style={{fontFamily:"Expletus Sans"}}>{className}, {subName}</p>
            </div>
            <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: -30,
              depth: 150,
              modifier: 3,
              slideShadows: false,
            }}  
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <div className='bg-dark d-flex flex-row flex-wrap justify-content-center align-items-center' style={{gap:80}}>
                {res.map((item,index) => {return(
                    <SwiperSlide className='rounded rounded-5' key={index} onClick={() => Clicked(index)} style={{width:'350px',height:'500px',gap:40}} >
                        <img style={{borderRadius:15}} alt='Card' src={require(`../Assets/${item.body}`)} />
                        <br></br>
                        <div className=' p-3 rounded-5' style={{background:'rgba(0,0,0,0.3)'}}>
                        <h5 className='text-white text-center h4' style={{fontFamily:"QuickSand"}}>{item.sname}</h5>
                        </div>
                    </SwiperSlide>
                )})}
            </div> 
            </Swiper>
        </div>

        }  
        <div className='fpop-out' id='pop-out'>
            <div className='f-pop bg' id='pop'>
                <button className='p-2 btn-close text-white '  onClick={() => ClosePop()}></button>
                <div className='d-flex align-items-start  h-100'> 
                    <div className='w-50 h-100 d-flex flex-column justify-content-around align-items-center'>
                        <form className='frm-input'>
                            <MDBInput className='inp my-3 mt-1' label='Quiz Name' id='quizName' type='text' onChange={(e) => setquizName(e.target.value)} labelStyle={{color:'white'}} contrast required />
                            <MDBInput label='Topic Name' className='my-3' id='topicName' type='text' onChange={(e) => settopicName(e.target.value)}  labelStyle={{color:'white'}} contrast required />
                            <MDBInput label='Quiz date' className='my-3' id='quizDate' type='date' onChange={(e) => setquizDate(e.target.value)}  labelStyle={{color:'white'}} contrast required />
                            <MDBInput label='Quiz Time' className='my-3' id='quizTime' type='time' onChange={(e) => setquizTime(e.target.value)} labelStyle={{color:'white'}} contrast required />
                            <MDBInput label='Duration (minutes)' className='my-3' id='duration' type='text' onChange={(e) => setDuration(e.target.value)} labelStyle={{color:'white'}} contrast required />
                            <MDBInput label='Marks per question' className='my-3' id='mpq' type='text' onChange={(e) => setMpq(e.target.value)} labelStyle={{color:'white'}} contrast required />
                            <Form.Select aria-label="Default select example" onChange={(e) => {setquizNumber(e.target.value)}}>
                                <option>Select the Quiz Number</option>
                                <option value="1">Quiz 1</option>
                                <option value="2">Quiz 2</option>
                            </Form.Select>
                            <br></br>
                            <div className='d-flex justify-content-around'>
                                <MDBBtn className='btn btn-success w-100' onClick={Select}>select Questions</MDBBtn>
                                <MDBBtn className='btn btn-success w-100' onClick={Add}>Add Questions</MDBBtn>
                            </div>
                        </form> 
                    </div> 
                </div>   
            </div> 
        </div>

        <div className='fpop1-out ' id='pop1-out'>
            <div className='f1-pop bg' id='pop1'>
                <button  className='btn-close'  onClick={() => ClosePop1()}></button>
                <div className='d-flex align-items-start h-100'> 
                    <div className='w-50 h-100 d-flex flex-column justify-content-around align-items-center'>
                        <form className='frm-input'>
                            <MDBInput className='inp my-3 mt-1' label='Quiz Id' id='quizId' type='text' onChange={(e) => setquizId(e.target.value)} labelStyle={{color:'white'}} contrast required />
                            <MDBInput label='Quiz Date' className='my-3' id='quizDate' type='date' onChange={(e) => setquizDate(e.target.value)}  labelStyle={{color:'white'}} contrast required />
                            <MDBInput label='Quiz Time' className='my-3' id='quizTime' type='time' onChange={(e) => setquizTime(e.target.value)}  labelStyle={{color:'white'}} contrast required />
                            <MDBInput label='Duration' className='my-3' id='duration' type='text' onChange={(e) => setDuration(e.target.value)}  labelStyle={{color:'white'}} contrast required />
                            
                            <br></br>
                            <MDBBtn className='btn btn-success w-100' onClick={Update}>Update</MDBBtn>
                        </form> 
                    </div> 
                </div>   
            </div> 
        </div> 
    </div> 
    </>
)}   

export default Fclass