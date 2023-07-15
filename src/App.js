import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import ForgetPassword from './Components/Login/ForgetPassword';
import Homepage from './Components/Homepage/Homepage';
import Signup from './Components/Signup/Signup';
import Admin from './Components/Admin/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Userdetails from './Components/Admin/UserDetails/Userdetails';
import Companydetails from './Components/Admin/CompanyDetails/Companydetails';
import Managejobs from './Components/Admin/ManageJobs/Managejobs';
import Settingspage from './Components/Admin/Settings/Settingspage';
import Courses from './Components/Admin/Coursespage/Courses';
import Company from './Components/Company/Company';
import Postjob from './Components/Company/PostJob/Postjob';
import CompanyMessage from './Components/Company/MessagesPage/CompanyMessage';
import Postedjob from './Components/Company/Posted Jobs/Postedjob';
import AppliedCandidate from './Components/Company/AppliedCandidates/AppliedCandidate';
import CompanySettingspage from './Components/Company/Settings/CompanySettingspage';
import JobSeeker from './Components/Job Seeker/JobSeeker';
import AppliedJobs from './Components/Job Seeker/Applied Jobs/AppliedJobs';
import Usercoursespage from './Components/Job Seeker/Coursespage/Usercoursespage';
import UserFindJob from './Components/Job Seeker/FindJobpage/UserFindJob';
import JobSeekerMessage from './Components/Job Seeker/MessagesPage/JobSeekerMessage';
import JobSeekerSettingspage from './Components/Job Seeker/Settings/JobSeekerSettingspage';
import Testpage from './Components/Job Seeker/Testpage/Testpage';
import Singlejob from './Components/SingleJobpage/Singlejob';
function App() {
  return (
    <div className="App">
     <BrowserRouter> 
      <ToastContainer  position='bottom-right' draggable/>
        <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/Signup" element={<Signup/>}/>
        <Route exact path="/ForgetPassword" element={<ForgetPassword/>}/>
        <Route exact path="/Admin" element={<Admin/>}/>
        <Route exact path="/Userdetails" element={<Userdetails/>}/>
        <Route exact path="/Companydetails" element={<Companydetails/>}/>
        <Route exact path="/Managejobs" element={<Managejobs/>}/>
        <Route exact path="/Settingspage" element={<Settingspage/>}/>
        <Route exact path="/Courses" element={<Courses/>}/>

        <Route exact path="/Company" element={<Company/>}/>
        <Route exact path="/Postjob" element={<Postjob/>}/>
        <Route exact path="/CompanyMessage" element={<CompanyMessage/>}/>
        <Route exact path="/Postedjob" element={<Postedjob/>}/>
        <Route exact path="/AppliedCandidate" element={<AppliedCandidate/>}/>
        <Route exact path="/CompanySettingspage" element={<CompanySettingspage/>}/>

        <Route exact path="/JobSeeker" element={<JobSeeker/>}/>
        <Route exact path="/AppliedJobs" element={<AppliedJobs/>}/>
        <Route exact path="/Usercoursespage" element={<Usercoursespage/>}/>
        <Route exact path="/UserFindJob" element={<UserFindJob/>}/>
        <Route exact path="/JobSeekerMessage" element={<JobSeekerMessage/>}/>
        <Route exact path="/JobSeekerSettingspage" element={<JobSeekerSettingspage/>}/>
        <Route exact path="/Testpage" element={<Testpage/>}/>
        <Route exact path="/Singlejob" element={<Singlejob/>}/>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
