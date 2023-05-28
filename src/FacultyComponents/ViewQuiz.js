import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import NavbarComp from '../Components/NavbarComp';
import {Card} from 'react-bootstrap'
import axios from 'axios'
import { Fade } from 'react-awesome-reveal';
import Cookies from 'js-cookie';

const ViewQuiz = () => {
    if(Cookies.get('process_id')===undefined)
        navigate('/flogin')
    const [resQuiz,setResQuiz] = React.useState([])
    const Location = useLocation();
    const navigate = useNavigate();
    const quizId = Location.state.quizId
    const quizName = Location.state.quizName
    console.log(quizId);

    React.useEffect(() => {
        axios.post('https://anitsquiz.onrender.com/view-quiz',{quizIds:quizId}).then((res) => {
            setResQuiz(res.data.quesDetails)
        })
    },[])  
return (
    <> 
        <div className='border assign-bg' style={{minHeight:"100vh"}}> 
        <div>
            <NavbarComp /> 
        </div>
        <div className='d-flex flex-wrap justify-content-center align-items-center border m-5'><h1>{quizName}</h1></div>
        <div className='w-100 d-flex flex-column py-5 align-items-center' style={{gap:"20px 0px"}}>
        <Fade cascade duration={1500} damping={.1}> 
                        {resQuiz.map((item) => {
                            return( 
                                <Card id='sqs' className='hovered hovered-1'  key={item.quesid}>  
                                    <Card.Body className='text-start'>  
                                        <Card.Title><b>{item.topicName}</b></Card.Title>
                                        <Card.Title id='selectqs-card-text' style={{fontSize:"22px"}}>{item.question}</Card.Title>
                                    </Card.Body> 
                                </Card> 
                            ); 
                        })}
        </Fade>
        </div>
        </div> 
    </> 
)}

export default ViewQuiz