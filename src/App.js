import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import FLogin from './Components/FLogin';
import SLogin from './Components/SLogin';
import SDash from './StudentComponents/SDash';
import Fdashboard from './FacultyComponents/Fdashboard';
import Fclass from './FacultyComponents/Fclass';
import SQuiz from './Components/SQuiz'
import StudentDetails from './FacultyComponents/StudentDetails';
import SelectQues from './FacultyComponents/SelectQues'
import Addqs from './FacultyComponents/Addqs';
import SNotes from './FacultyComponents/SNotes';
import AttempQuiz from './StudentComponents/AttempQuiz';
import HostedQuizes from './FacultyComponents/HostedQuizes';
import About from './Components/About';
import FileRenderer from './StudentComponents/FileRenderer';
import HomeTemp from './Components/HomeTemp';
import ViewQuiz from './FacultyComponents/ViewQuiz';
import Career from './Components/Career';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeTemp />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/flogin' element={<FLogin />}></Route>
          <Route path='/slogin' element={<SLogin />}></Route>
          <Route path='/student/sdash' element={<SDash />}></Route>
          <Route path='/student/assignment' element={<AttempQuiz />}></Route>
          <Route path='/faculty/fdash' element={<Fdashboard />}></Route>
          <Route path='/student/quizqs' element={<SQuiz />}></Route>
          <Route path='/faculty/myclass' element={<Fclass />}></Route>
          <Route path='/faculty/myclass/assignquiz/select-ques' element={<SelectQues />}></Route>
          <Route path='/faculty/myclass/assignquiz/select-quiz' element={<HostedQuizes />}></Route>
          <Route path='/faculty/myclass/assignquiz/add-ques' element={<Addqs />}></Route>
          <Route path='/faculty/myclass/post-notes' element={<SNotes/>}></Route>
          <Route path='/student/notes' element={<FileRenderer />}></Route>
          <Route path='/faculty/myclass/student-details' element={<StudentDetails />}></Route>
          <Route path='/faculty/fdash/hosted-quiz' element={<ViewQuiz />}></Route>
          <Route path='/career' element={<Career />}></Route>
        </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;
