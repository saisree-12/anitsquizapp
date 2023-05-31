import React from 'react'
// import Timer from './Timer'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const Timer = ({duration,onTimeOver}) => {

    const [timeLeft, setTimeLeft] = React.useState(duration * 60);
  
    React.useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    React.useEffect(() => {
        if (timeLeft === 0) {
          onTimeOver(); // Trigger the event when the time is over
        }
      }, [timeLeft,onTimeOver]);

    return (
      <div>
        <h1>00:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h1>
      </div>
    );
  }
  



const Quizques = () => {

    const [blabel,setBlabel] = React.useState('Next')
    const [marks,setMarks] = React.useState(0)
    const [mpq,setMpq] = React.useState()
    const [ch,setCh] = React.useState('')
    const [selans,setAns] = React.useState([])
    const [selop,setOp] = React.useState([0,0,0,0])
    const [isLoading,setLoading] = React.useState(true)
    const [ind,setInd] = React.useState(0)
    const location = useLocation()
    const quizid = location.state.quizid
    const subId = location.state.subId
    const duration = location.state.duration
    const quizName = location.state.quizName
    const [qs,setQs] = React.useState()
    const navigate = useNavigate()

    const key = 'anudeepgude765'
    const ubytes = CryptoJS.AES.decrypt(Cookies.get('sprocess_id'),key)
    const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));

    const handleTimeOver = () => {
        axios.post('https://anitsquiz.onrender.com/updatemarks',{quizid:quizid,uname:uname,marks:marks*mpq,subId:subId})
            .then(res => {
                document.getElementById('pop').style.visibility = 'visible';
                document.getElementById('pop').style.backdropFilter = 'blur(5px)';
                document.getElementById('pop-out').style.visibility = 'visible';
                setTimeout(() => {
                    navigate('/student/sdash')
                },3000)
            })
      };


    if(Cookies.get('sprocess_id') === undefined)
        navigate('/slogin')
    React.useEffect(() => {
        setMpq(location.state.marks)
        axios.post('https://anitsquiz.onrender.com/quizquestions',{quizid:quizid})
        .then((res) => {
            setTimeout(() => {
                setLoading(false)
            },2000)
            setQs(res.data.questions)
            console.log(mpq);
        })
        //eslint-disable-next-line
    },[quizid])

    const Next = (e) => {
        console.log(ind);
        if(ind<(qs.length-1)){
            if(qs[ind].answer === ch){
                setMarks(marks+1)
            } 
            setAns([...selans,ch])
            if(ind === qs.length-2){
                setBlabel('Submit')
            }
            setInd(ind+1)
        }else if(ind===qs.length-1){
            if(qs[ind].answer === ch){
                setMarks(marks+1)
            }
            setAns([...selans,ch])
            document.querySelector("#sub-btn").classList.remove('btn-primary')
            document.querySelector("#sub-btn").classList.add('btn-success')
            document.getElementById('pop').style.visibility = 'visible';
            document.getElementById('pop').style.backdropFilter = 'blur(5px)';
            document.getElementById('pop-out').style.visibility = 'visible';
            axios.post('https://anitsquiz.onrender.com/updatemarks',{quizid:quizid,uname:uname,marks:(marks+1)*mpq,subId:subId})
            .then(res => {
                setTimeout(() => {
                    navigate('/student/sdash')
                },3000)
            })
        }
        console.log(marks);
        var l = [...selop]
        l = [0,0,0,0]
        setOp(l)
    }

    const optionClicked =async (e,index) => {
        const value = e.target.innerText;
        var l = [...selop]
        l = [0,0,0,0]
        l[index] = 1;
        setOp(l)
        setCh(value);
      }
    

  return (
    <>
    {isLoading?
        <>
           <Loader />
        </>:
    <div className='d-flex flex-column flex-wrap ques' style={{height:"100vh",width:"100%",background:"linear-gradient(to right,#cfd9df,#e2ebf0)"}}>
        <div className='d-flex p-4 justify-content-around'>
            <p className='h2 ps-5 text-dark' style={{fontFamily:'QuickSand'}}>{quizName}</p>
            <p className='h5 text-dark' style={{fontFamily:"QuickSand"}} id='timer'><Timer duration = {duration} onTimeOver = {handleTimeOver}/></p>
        </div> 
        <div className='d-flex flex-column justify-content-start pt-5' style={{gap:60}}>
            <div className='container d-flex flex-column shadow bg-white  px-5 py-3 q-top' >
                <div className='my-3'> 
                    <p className='h2 text-decoration-underline'>Question {ind+1}</p>
                </div>
                <div className='d-flex my-3 flex-row flex-wrap'>
                    <label className='h4 prevent-select'>{qs[ind].question}</label>
                </div>
            </div>
            <div className='container flex-column d-flex  px-1 py-4' style={{gap:50}}>
                <div className=' d-flex flex-row flex-wrap justify-content-between' style={{gap:"20px"}}>
                    <div className={`option shadow rounded rounded-5 p-3 ${selop[0] === 1?"bg-success  text-white":"bg-light  text-dark"}`} onClick={(e) => optionClicked(e,0)}>
                        <p key = {"1"} className={`h4 prevent-select`}>{qs[ind].option1}</p>
                    </div>
                    <div className={`option shadow rounded rounded-5 p-3 ${selop[1] === 1?"bg-success  text-white":"bg-light  text-dark"}`} onClick={(e) => optionClicked(e,1)}>
                        <p key = {2}  className='h4 prevent-select' >{qs[ind].option2}</p>
                    </div>
                </div>
                <div className='d-flex flex-row flex-wrap justify-content-between' style={{gap:"20px"}}>
                    <div className={`option h4 prevent-select shadow rounded  rounded-5 p-3 ${selop[2] === 1?"bg-success text-white":"bg-light text-dark"}`} onClick={(e) => optionClicked(e,2)}>
                        <p key={3}  className='h4 prevent-select' >{qs[ind].option3}</p>
                    </div>
                    <div className={`option shadow rounded rounded-5 p-3 ${selop[3] === 1?"bg-success  text-white":"bg-light  text-dark"}`} onClick={(e) => optionClicked(e,3)}>
                        <p key = {4} className='h4 prevent-select ' >{qs[ind].option4}</p>
                    </div>
                </div>
            </div>
            <div className='h1 container d-flex justify-content-end flex-wrap button-top' style={{gap:"10px",fontWeight:"600"}}>
                    <button className='h2 btn btn-primary' id='sub-btn' onClick={Next}>{blabel}</button>
            </div>
        </div> 
    <div className='fpop-out whole' id='pop-out' style={{backgroundColor:"rgba(0,0,0,.5)"}}>
            <div className='f-pop bg p-5' id='pop' style={{height:"400px"}}>
                        <div className='w-100 h-100 d-flex flex-column justify-content-center  text-center'>
                            <div className='h1 mb-5 text-light' style={{fontFamily:"QuickSand"}}>You got : {(marks)*mpq}</div>
                            <div className='h5 text-light' style={{fontFamily:"QuickSand",fontWeight:400}}>We will be redirecting you to your Dashboard in 3 seconds </div>
                        </div>
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default Quizques 