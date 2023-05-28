import React from 'react'

const Temp = () => {

    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);
      
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
      
          display.textContent = minutes + ":" + seconds;
      
          if (--timer < 0) {
            timer = duration;
          }
        }, 1000);
      }
      

    //eslint-disable-next-line
    const [res,setres] = React.useState([
        {Question:'what is java',option1:'java',option2:'Java',option3:'JAva',option4:'JAVa'},
        {Question:'what is java',option1:'java',option2:'Java',option3:'JAva',option4:'JAVa'},
        {Question:'what is java',option1:'java',option2:'Java',option3:'JAva',option4:'JAVa'},
        {Question:'what is java',option1:'java',option2:'Java',option3:'JAva',option4:'JAVa'},
    ])
  return (
    <>
    <div className='d-flex flex-row main border-5 justify-content-evenly' style={{width:'100vw',height:"100vh"}}>
        <div className='border d-flex flex-column justify-content-start pt-5' style={{gap:50,marginBlock:'80px'}}>
            <div className='container shadow d-flex flex-column px-5 py-4' style={{gap:'20px'}}>
                <div className='d-flex flex-wrap' >
                    <h3>Question 1</h3> 
                </div> 
                <div className='d-flex'>
                    <h4>Which of the following control expressions are valid for an if statement ?</h4>
                </div>
            </div>

            <div className='container d-flex flex-column border p-4' style={{gap:50}}>
                <div className='d-flex flex-wrap justify-content-between' style={{gap:60}}>
                    <div className=' shadow p-4 option'>
                        <h3>option 1</h3>
                    </div> 
                    <div className='shadow p-4 option'>
                        <h3>option 2</h3>
                    </div>
                </div> 
                <div className='d-flex flex-wrap justify-content-between' style={{gap:'60px'}}>
                    <div className='shadow p-4 option'>
                        <h3>option 3</h3> 
                    </div>
                    <div className='shadow p-4 option'>
                        <h3>option 4</h3>
                    </div>
                </div> 
            </div>

            <div className='container d-flex flex-wrap p-4 justify-content-between shadow' style={{}}>
                <div className='d-flex flex-row'>
                    <button className='btn btn-outline-primary h4'>Previous</button>
                </div>
                <div className='d-flex justify-content-evenly' style={{width:'400px'}}> 
                    <button className='btn btn-outline-warning h4'>Mark</button>
                    <button className='btn btn-outline-info h4'>Save</button>
                    <button className='btn btn-outline-success h4'>Next</button>
                </div> 
            </div> 
        </div> 
        <div className='flex-wrap d-flex flex-column border s_que'>
            <div className='d-flex shadow flex-wrap h4 p-3'>MCQ's on java</div>
            <div className='d-flex flex-wrap justify-content-center text-center' style={{gap:'30px'}}>
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button> 
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button> 
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button>
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button>
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button>
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button>
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button>
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button>
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button>
                <button className='btn btn-outline-success' style={{width:'40px',height:'50px'}}>1</button>
            </div>
        </div> 
    </div> 
    </> 
  ) 
} 

export default Temp
