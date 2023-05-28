import React from 'react'
import {Card} from 'react-bootstrap'
import NavbarComp from '../Components/NavbarComp'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import Loader from '../Components/Loader'
import { Fade } from 'react-awesome-reveal'
const SDash = () => {
  const [flag,setFlag] = React.useState(true)
  const [sname,setSname] = React.useState('')
  const [quizes,setRes] = React.useState([])
  const [notes,setNotes] = React.useState([])
  const [quizids,setQuizids] = React.useState([])
  const [isLoading,setLoading] = React.useState(true)
  const navigate = useNavigate()

  const key = 'anudeepgude765';
  window.addEventListener("popstate", e => {
    this.props.history.go(1);
  });
  if(Cookies.get('sprocess_id')===undefined) navigate('/slogin')

  React.useEffect(() => {
    const ubytes = CryptoJS.AES.decrypt(Cookies.get('sprocess_id'),key)
    const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));
      setFlag(true)
      axios.post('https://anitsquiz.onrender.com/sdash',{uname:uname})
      .then((res) => {
        setRes(res.data.quizes)
        setNotes(res.data.notes)
        setQuizids(res.data.quizid)
        setSname(res.data.student_name)
        
        setTimeout(() => {
          setLoading(false)
        },2000)
      })
     //eslint-disable-next-line 
    },[]) 

    console.log(quizids);

  const goToAssignment = (index) => {
    console.log("HI",index);
    navigate('/student/assignment',{state:{quizid:quizes[index].quizid}})
  }
  const Rendered = (index) => {
    axios.post('https://anitsquiz.onrender.com/pdf',{id:notes[index].notesId}).then(response => {
      console.log(response.data);
      window.open(response.data.url,'_blank');
  })
  }

  return (
    <>
    {flag?isLoading?<Loader/>:
    <div className='d-flex flex-column assign-bg pb-5' style={{minHeight:'100vh'}}>
        <div>
          <NavbarComp />
        </div>
        <Fade cascade duration={4000}>
        <div className='w-100 mt-5 pt-5'>
            <p className='text-center mt-5' style={{fontFamily:"QuickSand",fontWeight:800,fontSize:40}}>Welcome {sname}</p>
        </div>
        </Fade>
        <div className='ps-5 mb-0 mt-5 pt-5'>
          <p className='h1'>My Quizes</p>
        </div>
        <div className='d-flex flex-column '>
          <Fade cascade direction='left' duration={3000}>
        <div className='d-flex flex-row flex-wrap justify-content-start stouter align-items-center' style={{gap:50}}>
          {quizes.map((item,index) => {
            return(<Card key={index} className='animicard stcard p-2 stcard text-dark shadow shadow-lg rounded-3'
              style={{
                width: "400px",
                height: "200px",
                backgroundColor: "#fff",
                cursor:"pointer"
              }}
              onClick={() => goToAssignment(index)}
            > 
              <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title><h4 style={{fontWeight:800}} className='text-dark'>{item.QuizName}</h4></Card.Title> 
                <Card.Text className='d-flex flex-column justify-content-between'>
                  <h4 className='text-dark'>Subject Name : {item.SubjectName}</h4>
                  <h5 className='text-dark'>Number of Questions : {item.noqs}</h5>
                </Card.Text>
              </Card.Body>
            </Card>
      )})}
      </div>
      </Fade>
      </div>
      <div className='ps-5 mb-0 mt-5 pt-5'>
          <p className='h1'>My Notes</p>
        </div>
        <div className='d-flex flex-column '>
          <Fade cascade direction='right' duration={3000}>
        <div className='d-flex flex-row flex-wrap justify-content-start stouter align-items-center' style={{gap:50}}>
          {notes.map((item,index) => {
            return(<Card className='animicard stcard py-2 stcard text-dark shadow shadow-lg rounded-3'
              style={{
                width: "400px",
                height: "200px",
                backgroundColor: "#fff",
              }}

              onClick={() => Rendered(index)}
            > 
              <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title><h4 style={{fontWeight:800}}>Notes</h4></Card.Title> 
                <Card.Text className='d-flex flex-column justify-content-between'>
                  <h4 className='text-dark'>Unit Name : {item.cName}</h4>
                  <h5 className='text-dark'>Subject Name : {item.subName}</h5>
                </Card.Text>
              </Card.Body>
            </Card>
      )})}
      </div>
      </Fade>
      </div>
      </div>
    :navigate('/slogin')}
    </>
  ) 
} 

export default SDash