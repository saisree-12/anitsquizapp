import React from 'react'
import { MDBInput,MDBTextArea } from 'mdb-react-ui-kit'
import AddImg from '../Assets/addqs.jpg' 
import { useLocation,useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import Loading from '../Components/Loader'
import axios from 'axios'

const Addqs = () => {

    if(Cookies.get('process_id')===undefined){
        navigate('/flogin')
    }

    const [ques,setQues] = React.useState('')
    const [option1,setOption1] = React.useState('')
    const [option2,setOption2] = React.useState('')
    const [option3,setOption3] = React.useState('')
    const [option4,setOption4] = React.useState('')
    const [answer,setAnswer] = React.useState('')
    const [noqss,setNoqs] = React.useState(0)

    const [isLoading,setLoading] = React.useState(true)
    const [result,setResult] = React.useState([])
    const [quesId,setquesId] = React.useState()
    const [flag,setFlag] = React.useState(true)


    const Location = useLocation(); 
    //eslint-disable-next-line
    const navigate = useNavigate();
    var subId = Location.state.subId
    var subName = Location.state.subName
    var quizId = Location.state.quizId
    var quizName = Location.state.quizName
    var topicName = Location.state.topicName
    var mpq = Location.state.mpq
    var classId = Location.state.classId 
    var quizDate = Location.state.quizDate
    var quizTime = Location.state.quizTime
    var duration = Location.state.duration 
    const key = 'saisree@12' 
    const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
    const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));
    var selected;
    React.useEffect(() => {
        axios.post('https://anitsquiz.onrender.com/add-ques',{}).then((res) => {
            setTimeout(() => {
                setLoading(false)
            },3000)
            setquesId(parseInt(res.data[0].quesid.toString().substring(1,3)))
            console.log(parseInt(res.data[0].quesid.toString().substring(1,3)));
        }) 
        var addFlag = Location.state.addFlag
        if(addFlag){
            quizName = Location.state.quizName
            topicName = Location.state.topicName
            subName = Location.state.subName
            quizDate = Location.state.quizDate
            quizTime = Location.state.quizTime
            duration = Location.state.duration
            mpq = parseInt(Location.state.mpq)
            quizId = Location.state.quizId
            subId = Location.state.subId
            selected = Location.state.selected 
            setResult([...selected])
            setNoqs(selected.length)
            console.log(result)
        } 
        // eslint-disable-next-line
    },[]) 

    const Add = (e) => {
        e.preventDefault();
        setquesId(quesId+1)
        setResult([...result,`Q${quesId+1}`])
        setNoqs(noqss+1)
            axios.post('https://anitsquiz.onrender.com/add-ques1',{
                quesId:`Q${quesId+1}`, 
                topicName:topicName,
                subName:subName,
                question:ques,
                option1:option1,
                option2:option2,
                option3:option3,
                option4:option4,
                answer:answer
            }).then((res) => {
            }) 
        setQues('')
        setOption1(''); 
        setOption2('');
        setOption3('');
        setOption4('')
        setAnswer('');
    }   
    const Host = (e) => {
        e.preventDefault();
        if(result.length >= 4){
            setquesId(quesId+1) 
            setResult([...result,`Q${quesId+1}`])
            axios.post('https://anitsquiz.onrender.com/select-prev-ques',{
                quizId:quizId, 
                quizName:quizName, 
                subName:subName,
                topicName:topicName,
                noqs:result.length,
                marks:result.length*mpq,
                classId:classId,
                quizDate:quizDate,
                duration:duration,
                quizTime:quizTime,
                uname:uname,
                subId:subId}).then((res) => {
                    // console.log(res)
                }) 
            axios.post('https://anitsquiz.onrender.com/add-ques1',{
                quesId:`Q${quesId+1}`, 
                topicName:topicName,
                subName:subName,
                question:ques, 
                option1:option1,
                option2:option2,
                option3:option3,
                option4:option4,
                answer:answer
            })  
            console.log(result);
                axios.post('https://anitsquiz.onrender.com/add-select-prev-ques',{quizId:quizId,selected:[...result,`Q${quesId+1}`]}).then((res) => {
                })  
            navigate('/faculty/fdash');
        } 
        else{
            setFlag(false);
        6}
    } 
    const AddPrev = (e) => {
        e.preventDefault();
        setquesId(quesId+1)
        setResult([...result,`Q${quesId+1}`])
        axios.post('https://anitsquiz.onrender.com/add-ques1',{
            quesId:`Q${quesId+1}`, 
            topicName:topicName,
            subName:subName,
            question:ques, 
            option1:option1,
            option2:option2,
            option3:option3,
            option4:option4,
            answer:answer
        })
        navigate('/faculty/myclass/assignquiz/select-ques',{state:{quizName:quizName,topicName:topicName,subId:subId,quizDate:quizDate,subName:subName,quizTime:quizTime,duration:duration,mpq:mpq,classId:classId,quizId:quizId,Result:[...result,`Q${quesId+1}`],selectFlag:1}})
    }

return (
    <>
        {isLoading?<Loading />:  
        <div className='d-flex flex-row align-items-center justify-content-between'>
            <div className='add-ques-div'>
                <div className='d-flex flex-column justify-content-center add-ques-inndiv'>
                {flag?<></>:
                <>
                    <Alert className='container mt-2' variant="warning" onClose={() => setFlag(true)} dismissible >  
                    <p className='h6'><b>Please add atleast 5 question</b></p>   
                    </Alert> 
                </>}
                    <p className='h3 text-center text-white mb-5' style={{fontFamily:"QuickSand"}}>Question Form</p>
                    <p className='h3 text-start text-white mb-5' style={{fontFamily:"QuickSand"}}>Question No. {noqss+1}</p>
                    <form> 
                        <MDBTextArea className='my-5' contrast type='text' rows={3} id='ques' value={ques} label="Question" onChange={(e) => setQues(e.target.value)}></MDBTextArea>

                        <MDBInput className='my-5' contrast type='text' id='option1' value={option1} label="Option 1" onChange={(e) => setOption1(e.target.value)}></MDBInput>
                        <MDBInput className='my-5' contrast  type='text' id='option2' value={option2} label="Option 2" onChange={(e) => setOption2(e.target.value)}></MDBInput>
                        <MDBInput className='my-5'  contrast  type='text' id='option3' value={option3} label="Option 3" onChange={(e) => setOption3(e.target.value)}></MDBInput>
                        <MDBInput className='my-5' contrast  type='text' id='option4' value={option4} label="Option 4" onChange={(e) => setOption4(e.target.value)}></MDBInput>
                        <MDBInput className='my-5' contrast  type='text' id='answer' value={answer} label="Answer" onChange={(e) => setAnswer(e.target.value)}></MDBInput>
                        <div className='my-5 d-flex flex-wrap justify-content-between'>
                            <button className='btn btn-primary animicard' onClick={Add}>Add Question</button>
                            <button className='btn btn-primary animicard' onClick={AddPrev}>Add from prev questions</button>
                            <button className='btn btn-primary animicard' onClick={Host}>Host & Mail</button>
                        </div>
                    </form>
                </div>
            </div>
            <div> 
                <img src={AddImg} alt="AddQuestionImage" className='image' style={{height:"90vh"}}></img>
            </div>
        </div> 
        } 
    </>
)} 

export default Addqs