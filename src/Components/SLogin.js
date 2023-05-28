import React from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import Slog from '../Assets/slogin.jpg'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js';

const SLogin = () => {
    const [uname,setUname] = React.useState()
    const [pwd,setPwd] = React.useState()
    const [err,setErr] = React.useState("")
    const navigation = useNavigate()
    const Submit = (e) => {
    const key = "anudeepgude765";
        e.preventDefault();
        axios.post('http://localhost:8888/slogin',{uname:uname,pwd:pwd})
        .then((res) => {
            if(res.data.validation){
                const encrypteduname = CryptoJS.AES.encrypt(JSON.stringify(uname),key).toString()
                Cookies.set("sprocess_id",encrypteduname,{path:'/',expires:1})
                navigation('/student/sdash',{state:{flag:true}})
            }else{
                setErr("Please enter valid credentials")
            }
        })
    }

    return (
    <>
    <div className='d-flex flex-column back' style={{height:'100vh'}}> 
        <div className='overall border d-flex justify-content-between align-items-center h-100'> 
            <div className='frm-slogin d-flex text-center border flex-column justify-content-center align-items-center h-100 w-100'>
            <p className='h2 text-white mb-5' style={{fontFamily:'QuickSand'}}>Login Here</p>
                <form className='frm-input'>
                    <MDBInput className='inp my-3 mt-1' label='Roll Number' id='Roll Number' type='text' labelStyle={{color:'white'}} contrast required
                        onChange={(event) => {
                            setErr('')
                            setUname(event.target.value)
                        }}
                    /><br></br>
                    <MDBInput label='Password' className='my-3' id='Psssword' type='password' labelStyle={{color:'white'}} contrast required
                        onChange={(event) => {
                            setErr('')
                            setPwd(event.target.value)
                        }}
                    />
                    <div className='h5 text-danger'>{err}</div>
                    <br></br>
                    <button className='btn btn-success w-100' onClick={Submit}>Login</button>
                </form>
            </div> 
            <div className=''>
                <img className='image' style={{height:'90vh'}} alt='SLOGIN' src={Slog}></img>
            </div> 
        </div> 
    </div> 
    </> 
  ) 
} 

export default SLogin