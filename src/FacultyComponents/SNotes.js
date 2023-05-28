import React from 'react'
import { MDBInput,MDBFile,MDBTextArea, MDBCheckbox } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SNotes = () => {
  const navigate = useNavigate()
  if(Cookies.get('process_id')===undefined)
       navigate('/flogin')
    const [file,setFile] = React.useState()
    const [fileName,setFilename] = React.useState()
    const [cname,setCname] = React.useState()
    const [check,setCheck] = React.useState('0')
    const [msg,setMsg] = React.useState('')
    const location = useLocation()
    const subId = location.state.subId
    const classId = location.state.classId
    console.log(subId);
    const key = 'saisree@12'
    const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
    const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));

    const config =  {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }

    const uploadFile = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('subId',subId)
        formData.append('classId',classId)
        formData.append('cname',cname)
        formData.append('check',check)
        formData.append('uname',uname)
        formData.append('msg',msg)
        formData.append("file",file);
        formData.append("fileName",fileName);
        axios.post('http://localhost:8888/uploaded',formData,config)
        setTimeout(() => {
          navigate(-1);
        },500)
    }

    const saveFile = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
        e.preventDefault();
      }

  const Changed = (e) => {
    if(e.target.checked) setCheck('1')
      else setCheck('0')
  }

  return (
    <>
    <div className='d-flex flex-column back' style={{height:'100vh'}}> 
        <div className='overall border d-flex justify-content-between align-items-center h-100'> 
            <div className='frm d-flex border flex-column justify-content-center align-items-center h-100 w-100'>
            <p className='h2 text-white mb-5' style={{fontFamily:'QuickSand'}}>Attach a File</p>
                <form onSubmit={uploadFile}>
                    <MDBInput label='Chapter Name' id='chapterName' type='text' labelStyle={{color:'white'}} contrast required onChange={(e) => {setCname(e.target.value)}}/><br></br>
                    <MDBFile name='file' label='Add Notes' id='customFile' labelStyle={{color:'white'}} contrast required
                        onChange={saveFile}
                    /><br></br>
                    <MDBCheckbox name='send' id='send' label='share to students mail' labelStyle={{color:'white'}} contrast onChange= {Changed}/><br></br>
                    <MDBTextArea id='message' label='Type your message here...' onChange={(e) => setMsg(e.target.value)} rows={3} className='msg' contrast/> 
                <div className='d-flex justify-content-between'>
                <button className='btn btn-success mt-5'>Post</button>
                <button className='btn btn-warning mt-5'>Cancel</button>
                </div>
                </form>
            </div> 
            <div className=''>
                <img className='image' style={{height:'90vh'}} alt='Add Notes' src='https://img.freepik.com/free-vector/emails-concept-illustration_114360-1217.jpg?w=826&t=st=1680952077~exp=1680952677~hmac=5c5614d7b113ba0a5241828d7969296a199b1bfb2f2ee6ed81f1cc294e61fb3c'></img>
            </div> 
        </div> 
    </div> 
    </> 
  ) 
} 

export default SNotes