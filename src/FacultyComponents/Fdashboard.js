import React from 'react'
import NavbarComp from '../Components/NavbarComp'
import {Card} from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import Loading from '../Components/Loader'
import { Fade } from 'react-awesome-reveal'

const Fdashboard = () => {
    console.log(window.history);
    const [usr,setUsr] = React.useState() 
    const [res,setRes] = React.useState([])
    const [resQuiz,setResQuiz] = React.useState([])
    const [fNotes,setFNotes] = React.useState([])

    const [isLoading,setLoading] = React.useState(true)
    const navigate = useNavigate(); 
    if(Cookies.get('process_id')===undefined){
        navigate('/flogin')
    }
    const key = 'saisree@12'
    const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
    const d_uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));
    var state;

    React.useEffect(() => {
        axios.post('https://anitsquiz.onrender.com/fdash',{uname:d_uname}).then((res) => { 
            setTimeout(() => {
                setLoading(false)
            },1000)
            setRes(res.data.result)
            setResQuiz(res.data.quizDetails)
            setFNotes(res.data.fNotes)
        })  
        setUsr(d_uname)
        //eslint-disable-next-line
    },[]) 
    const Rendered = (index) => {
    axios.post('https://anitsquiz.onrender.com/pdf',{id:fNotes[index].notesId}).then(response => {
        console.log(response.data);
        window.open(response.data.url,'_blank');
    })
    }   
    
    
    return (
    <> 
        <div className='assign-bg'>
            <div>
                <NavbarComp /> 
            </div>
            {isLoading?<Loading />:
            <div className='d-flex flex-column fdash w-100'>
                <Fade cascade duration={2000}>
                <div className=' p-5 m-5 text-center'>
                    <p className='h1 mt-5' style={{fontWeight:"600"}}>Welcome {usr} ,</p>
                </div>
                </Fade>
                <div className='d-flex flex-column'>
                    <div> 
                        <div className='pb-2 mx-5'>
                        <p className='h1' style={{fontWeight:800}}>My classes</p>
                        </div>
                        <Fade cascade duration={3000} direction='left'>
                        <div className='d-flex flex-row flex-wrap justify-content-start stouter align-items-center' style={{gap:50}}>
                            {res.map(item => {
                                    return(<Card className='animicard stcard p-2 text-dark shadow shadow-lg rounded-1'
                                    style={{
                                        width: "400px",
                                        height: "200px",
                                        backgroundColor: "#fff",
                                        cursor:"pointer"
                                    }}
                                    onClick={() => {
                                        state = {className:item.className,subName:item.subName,classId:item.classId,subId:item.subId}
                                        window.history.pushState(state,'/faculty/fdash')
                                        navigate('/faculty/myclass',{state:state})}}
                                    > 
                                    <Card.Body>
                                        <Card.Title><h1>{item.className}</h1></Card.Title> 
                                        <Card.Text>
                                        <h4 className='text-dark'>{item.subName}</h4>
                                        <h4 className='text-dark'>Subject Code : <b>{item.subId}</b></h4>
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                        )})} 
                        </div>
                        </Fade>
                    </div>
                </div>

                <div className='d-flex flex-column'>
                    <div className='pb-2 mx-5'>
                        <p className='h1' style={{fontWeight:800}}>My Quizes</p>
                    </div>
                    <Fade cascade duration={3000} direction={'right'}>
                    <div className='d-flex flex-row flex-wrap justify-content-start stouter align-items-center' style={{gap:50}}>
                        {resQuiz.map(item => {
                                return(<Card className='animicard stcard p-2 text-dark shadow shadow-lg rounded-1'
                                style={{
                                    width: "400px",
                                    height: "220px",
                                    backgroundColor: "#fff",
                                    cursor:"pointer"
                                }}
                                onClick={() => {
                                    const statevariables = {quizId:item.quizid,quizName:item.QuizName}
                                    navigate('/faculty/fdash/hosted-quiz',{state:statevariables})
                                    window.history.pushState(statevariables,'/faculty/fdash/hosted-quiz');
                                }}
                                > 
                                <Card.Body>
                                    <Card.Title><h1>{item.class_id}</h1></Card.Title> 
                                    <Card.Text>
                                    <h4 className='text-dark'>{item.QuizName}</h4>
                                    <h4 className='text-dark'>{item.quizid}</h4>
                                    <h4 className='text-dark'>{item.quizdate}</h4>
                                    </Card.Text>
                                </Card.Body> 
                                </Card>
                    )})} 
                    </div>
                    </Fade>
                </div> 

                <div className='d-flex flex-column'>
                    <div className='pb-2 mx-5'>
                        <p className='h1' style={{fontWeight:800}}>My Notes</p>
                    </div>
                    <Fade cascade duration={3000}>
                    <div className='d-flex flex-row flex-wrap justify-content-start stouter align-items-center' style={{gap:50}}>
                        {fNotes.map((item,index)=> {
                                return(<Card key={index} className='animicard stcard p-2 text-dark shadow shadow-lg rounded-1'
                                style={{
                                    width: "400px",
                                    height: "220px",
                                    backgroundColor: "#fff",
                                    cursor:"pointer"
                                }}
                                onClick={() => Rendered(index)}
                                > 
                                <Card.Body>
                                    <Card.Title><h1>{item.class_id}</h1></Card.Title> 
                                    <Card.Text>
                                    <h1 className='text-dark'>{item.classId}</h1>
                                    <h4 className='text-dark'>{item.subName}</h4>
                                    <h4 className='text-dark'>Topic Name: {item.cName}</h4>
                                    </Card.Text>
                                </Card.Body> 
                                </Card>
                        )})} 
                    </div> 
                    </Fade>
                </div> 

            </div>
        }
        </div>
    </>
)
}

export default Fdashboard