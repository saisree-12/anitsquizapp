import React from 'react'
import NavbarComp from '../Components/NavbarComp'
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js';
import Loading from '../Components/Loader'
import { Fade } from 'react-awesome-reveal';

const StudentDetails = () => {

    const [res,setRes] = React.useState([])

    const navigate = useNavigate()
    const Location = useLocation();
    const classId = Location.state.classId; 
    const className = Location.state.className
    const subName = Location.state.subName
    const subId = Location.state.subId; 
    const key = 'saisree@12'
    const ubytes = CryptoJS.AES.decrypt(Cookies.get('process_id'),key);
    const d_uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));

    React.useEffect(() => {
      axios.post('http://localhost:8888/student-details',{classId:classId,subId:subId}).then((res) => {
        console.log(subId);
        setRes(res.data);
        setTimeout(() => {
          setLoading(false)
        },2000)
      })
    },[]) 
    const data = {
      columns: [
        {
          label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Roll Number',
            field: 'regno',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Quiz1',
            field: 'quiz1_marks',
            sort: 'asc',
            width: 250
          },
          {
            label: 'Quiz2',
            field: 'quiz2_marks',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Quiz Total',
            field: 'tot_marks',
            sort: 'asc',
            width: 200
          },
        ],
        rows: res
      };

      console.log(Location.state);

      if(Cookies.get('process_id')===undefined)
        navigate('/flogin')

      const [isLoading,setLoading] = React.useState(true)


      const handlePrint = () => {
        console.log("Called");
        axios.post('http://localhost:8888/download-pdf',{data:data,cName:className,subName:subName},{responseType:'arraybuffer'})
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data],{ type: 'application/pdf' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'studentmarksdetails.pdf');
          document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('PDF generation request sent successfully');
          })
          .catch((error) => {
            console.error('Error sending PDF generation request:', error);
          });
      };
      const config =  {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }

      const handleEmail =async (e) => {
        e.preventDefault()
        var fileData;
        await axios.post('http://localhost:8888/download-pdf', { data: data, cName: className, subName: subName }, { responseType: 'arraybuffer' })
          .then((response) => {
            fileData = new Blob([response.data], { type: 'application/pdf' })
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);
          });
          const formData = new FormData();
          formData.append('classId', classId);
          formData.append('cname',className)
          formData.append('file', fileData, 'studentmarksdetails.pdf');
        await axios.post('http://localhost:8888/send-email',formData,config)
          .then((response) => {
            console.log('PDF sent via email successfully');
          })
          .catch((error) => {
            console.error('Error sending PDF via email:', error);
          });
      };
      

      if(Cookies.get('process_id')===undefined){
          navigate('/flogin')
      } 

      return (
        <>
        {isLoading?<Loading />:
        <div className='assign-bg1' style={{minHeight:"100vh"}}>
          <NavbarComp />
        <div className='sd-table w-100 mt-5' style={{fontFamily:"QuickSand"}}>
          <Fade cascade duration={2000}>
            <div style={{width:"1400px"}}>
            <MDBDataTable
                striped
                entriesOptions={[35,60,100]}
                entries={35}
                bordered
                small
                paging = {true}
                data={data}/> 
            </div>
            </Fade>
        </div>
        <div className='d-flex flex-column text-center align-items-center justify-content-center p-5'>
            <p className='h3'>Send the report to Students Mail ID</p>
            <div className='d-flex justify-content-evenly'>
                <button className='btn btn-primary' onClick={handleEmail}>Send Mail</button>
                <button className='btn btn-primary' onClick={handlePrint}>Print</button>
            </div>
        </div>
        </div>
        }
        </>
      );
}

export default StudentDetails
