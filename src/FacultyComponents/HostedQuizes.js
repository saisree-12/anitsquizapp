import React from 'react'
import NavbarComp from '../Components/NavbarComp'
import {Card} from 'react-bootstrap'
import { MDBInput } from 'mdb-react-ui-kit'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const HostedQuizes = () => {
    const navigate = useNavigate()
    if(Cookies.get('process_id')===undefined)
       navigate('/flogin')

    //eslint-disable-next-line
    const [quiz,setQuiz] = React.useState([
        {quizName:"Quiz on Java",topicName:"Java",nqs:"20"},
        {quizName:"Quiz on Python",topicName:"Java",nqs:"20"},
        {quizName:"Quiz on CPP",topicName:"Java",nqs:"20"},
        {quizName:"Quiz on C",topicName:"Java",nqs:"20"},
        {quizName:"Quiz on OS",topicName:"Java",nqs:"20"},
        {quizName:"Quiz on WT",topicName:"Java",nqs:"20"},
        {quizName:"Quiz on Java",topicName:"Java",nqs:"20"},
        {quizName:"Quiz on Java",topicName:"Java",nqs:"20"},
        {quizName:"Quiz on Java",topicName:"Java",nqs:"20"},
    ])

    const Selected = (index) => {
        console.log(index);
        const quizc = document.getElementById('quizcard');
        console.log(quizc);
        quizc[index].style.backgroundColor = 'green';
        quizc[index].style.color = 'white';
    }
  return (
    <div className='d-flex flex-column' style={{background:"linear-gradient(to right,#cfd9df,#e2ebf0)"}}>
        <NavbarComp />
        <div className='d-flex flex-column align-items-center justify-content-start mt-5' style={{fontFamily:"QuickSand",gap:"15px"}}>
            <div className='text-center'>
                <p className='h3'>Select the Quiz from the given previous Quizes</p>
            </div>
            <div className='d-flex justify-content-end w-75 my-5 align-items-end'>
                <div className='d-flex flex-wrap justify-content-center' style={{gap:20}}>
                    <MDBInput type='text' id='searchqs' label='Search Quiz Name Here...' style={{width:"300px"}}></MDBInput>
                    <button className='btn btn-primary'>Search</button>
                </div>
            </div>
            <div className='d-flex flex-wrap justify-content-start stouter' style={{gap:50}}>
                {quiz.map((item,index) => {
                    return(
                        <div id='quizcard'>
                        <Card id='' className='st-card p-3 quizcard'
                            style={{height:"180px"}}
                            onClick={() => Selected(index)}
                        >
                            <Card.Body className='quizcardbody'>
                                <Card.Title ><b>Quiz Name :</b>&nbsp;{item.quizName}</Card.Title>
                                <Card.Title id='selectqs-card-text'><b>Topic Name : </b>{item.topicName}</Card.Title>
                                <Card.Title id='selectqs-card-text'><b>Number of Questions : </b>{item.nqs}</Card.Title>
                            </Card.Body>
                        </Card>
                        </div>
                    );
                })}
            </div>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-primary w-100 m-5'>Host Selected Quiz</button>
            </div>
        </div>
    </div>
  )
}

export default HostedQuizes