import React from 'react'
import NavbarComp from '../Components/NavbarComp'
import {Card} from 'react-bootstrap'
import { MDBInput } from 'mdb-react-ui-kit'
import { Alert } from 'react-bootstrap';
import CryptoJS from 'crypto-js'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loading from '../Components/Loader'
import { Fade } from 'react-awesome-reveal';
const SelectQues = () => {
    //eslint-disable-next-line
    const [qs,setQs] = React.useState([])
    const [selected,setSelected] = React.useState([])
    const [colored,setColored] = React.useState()
    const [qsSearch,setQsSearch] = React.useState([])
    const [search,setSearch] = React.useState('')
    const [isLoading,setLoading] = React.useState(true)
    const [flag,setFlag] = React.useState(true)
    const [noqss,setNoqs] = React.useState(0)
    
    const Location = useLocation(); 
    const navigate = useNavigate();
    if(Cookies.get('process_id')===undefined){
        navigate('/flogin')
    } 
    var subId = Location.state.subId
    var subName = Location.state.subName
    var quizId = Location.state.quizId
    var quizName = Location.state.quizName
    var topicName = Location.state.topicName
    //eslint-disable-next-line
    var noqs = Location.state.noqs
    var mpq = parseInt(Location.state.mpq)
    var classId = Location.state.classId 
    var quizDate = Location.state.quizDate
    var quizTime = Location.state.quizTime
    var duration = Location.state.duration
    var result
    const key = 'saisree@12'
    const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
    const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));

    React.useEffect(() => {
        var selectFlag = Location.state.selectFlag 
        if(selectFlag===1){
            quizName = Location.state.quizName
            topicName = Location.state.topicName
            quizDate = Location.state.quizDate
            quizTime = Location.state.quizTime
            duration = Location.state.duration
            mpq = Location.state.mpq
            subName = Location.state.subName
            quizId = Location.state.quizId
            result = Location.state.Result
            subId = Location.state.subId
            setSelected([...result])
            setNoqs(result.length)
        } 

        axios.post('https://anitsquiz.onrender.com/select-ques',{subName:subName}).then((res) => {
            setTimeout(() => {
                setLoading(false)
            },3000)
            const l = []
            setQs(res.data)
            qs.map(i => {
                l.push(i.quesid);
            })
            const dic = {}

            l.forEach(key => {
                dic[key] = false;
            })
            setColored(dic)

            setQsSearch(res.data) 
        })


    },[])  


    const Clicked = (e,val) => { 
        if(selected.indexOf(val) === -1){
            setSelected([...selected,val])
            setNoqs(noqss+1)
        }else{
            const updatedList = selected.filter((value) => value !== val);
            setSelected([...updatedList]); 
            setNoqs(noqss-1)
        } 
        var l = {...colored}
        l[val] = !l[val]
        setColored(l) 
    }  
    console.log(selected);

    const SearchedBox = (e) => {
        var l = [...qs]
        setSearch(e.target.value.toLowerCase());
        l = qsSearch.filter((item) => {
            if((item.topic_name.toLowerCase()).includes(search))
                return item;
        }) 
        if(e.target.value===""){
            l = [...qsSearch]
        }
        setQs(l)
    } 
    const Host = () => {
            if(selected.length>0){
                axios.post('https://anitsquiz.onrender.com/select-prev-ques',{
                    quizId:quizId,
                    quizName:quizName,
                    subName:subName,
                    topicName:topicName,
                    noqs:selected.length,
                    marks:selected.length*mpq,
                    classId:classId,
                    quizDate:quizDate,
                    duration:parseInt(duration),
                    quizTime:quizTime,
                    uname:uname,
                    subId:subId}).then((res) => {
                    console.log(res)
            }) 
            axios.post('https://anitsquiz.onrender.com/add-select-prev-ques',{quizId:quizId,selected:selected}).then((res) => {
            }) 
            navigate('/faculty/fdash')
        }   
        else{
            setFlag(false);
            window.scroll(0,0);
        }
    } 
    const Add = () => {
        navigate('/faculty/myclass/assignquiz/add-ques',{state:{selected:selected,subId:subId,subName:subName,quizName:quizName,topicName:topicName,classId:classId,quizDate:quizDate,quizTime:quizTime,duration:duration,mpq:mpq,quizId:quizId,addFlag:1}})
    }


return (
    <div className='d-flex flex-column' style={{minHeight:'100vh',background:"linear-gradient(to right,#cfd9df,#e2ebf0)"}}>
        <NavbarComp /> 
        {isLoading?<Loading />: 
        <div style={{marginTop:'100px'}}> 
            {flag?<></>:
            <> 
                <Alert className='container mt-5' variant="warning" onClose={() => setFlag(true)} dismissible >  
                <p className='h5'><b>Please select atleast 5 Questions to host your quiz</b></p>  
                </Alert>
            </>}   
            <div className='d-flex flex-column align-items-center justify-content-start mt-5' id='whole' style={{fontFamily:"QuickSand",gap:"15px"}}>
                <div className='text-center'>
                    <p className='h3'><b>Select the questions from the given question Bank</b></p>
                </div>
                <div className='text-center'>
                    <p className='h3'><b>Question No : {noqss+1}</b></p>
                </div>
                <div className='d-flex justify-content-end w-75 my-5 align-items-end'>
                    <div className='d-flex flex-wrap justify-content-center' style={{gap:20}}> 
                        <MDBInput type='text' id='searchqs' label='Search Topic Here...' onChange={SearchedBox} style={{width:"300px"}}></MDBInput>
                        {/* <button className='btn btn-primary' onClick={Searched}>Search</button> */}
                    </div> 
                </div>  
                    {qs.map((item) => { 
                        return( 
                            <Fade cascade duration={1000} damping={.2} className={`selectqs-card ${colored[item.quesid]?'bg-success text-white':'bg-white text-dark'}`}  key={item.quesid}>
                            <Card id='sqs' className={`selectqs-card ${colored[item.quesid]?'bg-success text-white':'bg-white text-dark'} shadow shadow-0`}  key={item.quesid} onClick={(e) => {Clicked(e,item.quesid)}}>  
                                <Card.Body>  
                                    <Card.Title><b>{item.topic_name}</b></Card.Title>
                                    <Card.Title id='selectqs-card-text'>{item.question}</Card.Title>
                                </Card.Body> 
                            </Card> 
                            </Fade>
                        ); 
                    })} 
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary  m-5' onClick={Add}>Add New qs</button>
                    <button className='btn btn-primary m-5' onClick={Host}>Host</button>
                </div> 
            </div>
        </div>
        } 
        {/* <div className='fpop-out' id='pop-out'>
            <div className='f-pop' id='pop'>
                <button className='btn btn-close'  onClick={() => ClosePop()}></button>
                <div className='d-flex align-items-start h-100'> 
                    <div className='w-50 h-100 d-flex flex-column justify-content-around align-items-center'>
                        <img></img>
                        <MDBBtn color='success' onClick={success}>Success</MDBBtn>
                    </div> 
                </div>   
            </div> 
        </div>  */}
    </div>
    )   
}   

export default SelectQues