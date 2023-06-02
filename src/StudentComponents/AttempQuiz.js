import React from 'react'
import Assingment from '../Assets/assignment.jpg'
import {FaStudiovinari} from 'react-icons/fa'
import {BiTimer} from 'react-icons/bi'
import {IoCheckmarkSharp} from 'react-icons/io5'
import {SlCalender} from 'react-icons/sl'
import { Card } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import Loader from '../Components/Loader'
const AttempQuiz = () => {
    if(Cookies.get('sprocess_id')===undefined) navigation('/slogin')
    const [res,setRes] = React.useState({})
    const [flag,setFlag] = React.useState(true)
    const [isLoading,setLoading] = React.useState(true)
    const [isValid,setValid] = React.useState(true)
    const [stime,setSTime] = React.useState()
    const [etime,setETime] = React.useState()
    const [ctime,setCTime] = React.useState()
    const [marks,setMarks] = React.useState(0)
    const [ans,setAns] = React.useState([])
    const [subId,setsubId] = React.useState()
    const navigation = useNavigate()
    const key = 'anudeepgude765'

    const ubytes = CryptoJS.AES.decrypt(Cookies.get('sprocess_id'),key)
    const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));
    const location = useLocation()    
    const date = new Date()
    const quizid = location.state.quizid;
    React.useEffect(() => {
        setCTime(date.toLocaleTimeString());
        if(location.state === null)
            navigation('/slogin',{state:{uname:uname}})
        axios.post('https://anitsquiz.onrender.com/attemptquiz',{quizid:quizid,uname:uname})
        .then(response => {
            setRes(response.data.data[0])
            setSTime(response.data.stime)
            setETime(response.data.etime)
            setValid(response.data.flag)
            setMarks(response.data.data[0].marks/response.data.data[0].noqs)
            setsubId(response.data.data[0].subId)
            setTimeout(()=> {
                setLoading(false)
            },2000)
        })   
    },[stime,etime])
    // console.log((etime),new Date().toLocaleTimeString({hour12:true}));
    const Attempt = () => {
        axios.post('https://anitsquiz.onrender.com/updatemarks',{quizid:quizid,uname:uname,marks:0,subId:subId})
            .then(res => {
                
            })  
        navigation('/student/quizqs',{state:{quizid:location.state.quizid,subId:res.subId,marks:marks,duration:res.duration,quizName:res.QuizName}})
    } 

    const getAnswers =() => {
        axios.post('https://anitsquiz.onrender.com/getans',{quizid:location.state.quizid,uname:uname})
        .then(res => {
            setAns(res.data.questions)
        })
    }

    console.log(new Date('2000/01/01 ' + etime).toLocaleTimeString('en-US', { hour12: false }) < new Date().toLocaleTimeString('en-US', { hour12: false }));
    // console.log(((stime<=ctime)
    // &&(ctime<=etime))
    // && isValid);
    // console.log((etime),new Date().toLocaleTimeString({hour12:true}))
    console.log(((new Date('1970/01/01 '+ stime).toLocaleTimeString('en-US', { hour12: false })<=new Date().toLocaleTimeString('en-US', { hour12: false }))
    &&(new Date().toLocaleTimeString('en-US', { hour12: false })<=new Date('1970/01/01 '+ etime).toLocaleTimeString('en-US', { hour12: false }))));
    // console.log(new Date('2000/01/01 ' + etime) < new Date().toLocaleString('en-US', { hour12: false }));
  return (
    <>
    {flag?isLoading?<Loader/>:
        <div className='d-flex align-items-center flex-column text-dark assign-bg' style={{width:"100vw",minHeight:"100vh",fontFamily:"QuickSand"}}>
            <div className='container  bg-light rounded rounded-3 assign-card border shadow shadow-md p-4 justify-content-between mx-3 d-flex'>
                <div className='d-flex flex-column'>
                    <p className='h2'>{res.QuizName}</p>
                    <p className='h4 mt-4'>Subject Name : {res.SubjectName}</p>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <p className='h4 mt-4'>No of Questions : {res.noqs}</p>
                        <p className='h4 mt-4'><IoCheckmarkSharp className='h4'/> Marks : {res.marks}</p> 
                    </div>
                    <div className='d-flex justify-content-between flex-wrap'>
                    <p className='h4 mt-3 me-5'><SlCalender className='h4'/> : {res.quizdate} / {res.quiztime}</p>
                    <p className='h4 mt-3'><BiTimer className='h3'/> {res.duration} minutes</p>
                    </div>
                    {((new Date('1970/01/01 '+ stime).toLocaleTimeString('en-US', { hour12: false })<=new Date().toLocaleTimeString('en-US', { hour12: false }))
                        &&(new Date().toLocaleTimeString('en-US', { hour12: false })<=new Date('1970/01/01 '+ etime).toLocaleTimeString('en-US', { hour12: false })))
                    && isValid 
                    &&<button className='btn btn-success btn-md mt-4' onClick={Attempt}>Attempt&nbsp;&nbsp;<FaStudiovinari/></button>}
                </div>
                <img src={Assingment} className='assign-image' alt='Assignment'></img>
            </div>  
                <div className='my-5 ans-div d-flex flex-column rounded rounded-5 py-5 align-items-center text-center'>
                    <button className={`btn btn-md btn-primary ${new Date('2000/01/01 ' + etime).toLocaleTimeString('en-US', { hour12: false }) < new Date().toLocaleTimeString('en-US', { hour12: false })?'enabled':'disabled'}`}onClick={getAnswers}>Show Answers</button>
                    <div className='w-100 d-flex flex-column py-5 align-items-center' style={{gap:"20px 0px"}}>
                        {ans.map((item) => {  
                            return(  
                                <Card id='sqs' className='hovered'  key={item.quesid}>  
                                    <Card.Body className='text-start'>  
                                        <Card.Title><b>{item.topic_name}</b></Card.Title>
                                        <Card.Title className='h4 prevent-select' dangerouslySetInnerHTML={{ __html: item.question }}></Card.Title>
                                        <Card.Text className='h4 prevent-select' dangerouslySetInnerHTML={{ __html: item.answer }}></Card.Text>
                                    </Card.Body> 
                                </Card> 
                            ); 
                        })}
                    </div>
                </div>
            </div> 
    :navigation('/slogin')}
    </>
  ) 
}

export default AttempQuiz