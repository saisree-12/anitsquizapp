import React from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import Flog from '../Assets/flogin.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const FLogin = () => {
    const [uname,setUname] = React.useState("");
    const [pwd,setPwd] = React.useState("");
    const [err,setErr] = React.useState("");
    const navigate = useNavigate(); 
    const key = 'saisree@12'

    
    const Submit = (e) => { 
        e.preventDefault();
        axios.post('http://localhost:8888/flogin',{uname:uname,pwd:pwd})
        .then((res) => {
            if(res.data.valid){
                const encrypteduname = CryptoJS.AES.encrypt(JSON.stringify(uname),key).toString()
                Cookies.set('process_id',encrypteduname,{path:'/',expires:1})
                navigate('/faculty/fdash',{state:{uname:uname}})
            }  
            else {
                Cookies.remove('process_id')
                setErr("* Invalid Credentials") 
            }  
        }) 
    }   
  return (  
    <> 
    <div className='d-flex flex-column back' style={{height:'100vh'}}> 
        <div className='overall border d-flex justify-content-between align-items-center h-100'> 
            <div className='frm-flogin d-flex text-center border flex-column justify-content-center align-items-center h-100 w-100'>
            <p className='h2 text-white mb-5' style={{fontFamily:'QuickSand'}}>Login Here</p>
                <form className='frm-input'>
                    <MDBInput className='inp my-3 mt-1' label='Username' id='Username' type='text' labelStyle={{color:'white'}} contrast required 
                    onChange={(e) =>{
                        setErr("")
                        setUname(e.target.value)
                    }}/>
                    <br></br>
                    <MDBInput label='Password' className='my-3' id='Psssword' type='password' labelStyle={{color:'white'}} contrast required 
                    onChange={(e) =>{
                        setErr("")
                        setPwd(e.target.value)
                    }}/>
                    <p className='h6' style={{color:'#F94A29',textAlign:'start'}}>{err}</p><br></br>
                    <button className='btn btn-success w-100' onClick={Submit}>Login</button>
                </form>  
            </div> 
            <div className=''>
                <img className='image' style={{height:'90vh'}} alt='FLOGIN' src={Flog}></img>
            </div>  
        </div> 
    </div> 
    </> 
  ) 
} 

export default FLogin
