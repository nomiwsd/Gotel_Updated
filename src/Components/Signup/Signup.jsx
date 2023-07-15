import React,{useState} from 'react'
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from './TabSelector';
import './Signup.scss'
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify'
import {  createUserWithEmailAndPassword,sendEmailVerification } from 'firebase/auth';
import { auth,firestore } from '../../firebase';
import { setDoc,doc } from "@firebase/firestore"
 

const Signup = () => {
    const [accountCreated,setAccountCreated] = useState(false)
    const [loading,setLoading] = useState(false)
    const [selectedTab, setSelectedTab] = useTabs([
        "Company",
        "JobSeeker"
    ]);
    const [CompanyName, setCompanyName] = useState('')
    const [CompanynameError, setCompanyNameError] = useState(false);
    const [UserName, setUserName] = useState('')
    const [UserNameError, setUserNameError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMSg,setErrorMsg] = useState('')
    const checkEmpty = (value) => {
        if (value.length === 0) {
            return true
        }
    }
    const validateData = () => {
        setErrorMsg(null)
        if (!CompanynameError) {
           
            if (checkEmpty(CompanyName)) {
                setCompanyNameError(true)
                toast.error('Company Name Cant be Empty')
                setErrorMsg('Company Name Cant be Empty')
                return false
            }
           
        }
    
        if (!emailError) {
            
            if (checkEmpty(email)) {
                setEmailError(true)
                toast.error('Email Cant be Empty')
                setErrorMsg('Email Cant be Empty')
                return false
            }
            else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                setEmailError(true)
                toast.error('Invalid Email')
                setErrorMsg('Invalid Email')
                return false
            }
        }
        if (!passwordError) {
            if (checkEmpty(password)) {
                setPasswordError(true)
                toast.error('Password Cant be Empty')
                setErrorMsg('Password Cant be Empty')
                return false
            }
            else if (password.length < 8) {
                setPasswordError(true)
                toast.error('Invalid Password , Password must be Greater then 8 Characters')
                setErrorMsg('Invalid Password , Password must be Greater then 8 Characters')
                return false
            }
        }
        if (errorMSg == null) {
            onSubmit()
        }
    }
    const validateDatae = () => {
        setErrorMsg(null)
      
        if (!UserNameError) {
           
            if (checkEmpty(UserName)) {
                setUserNameError(true)
                toast.error('User Name Cant be Empty')
                setErrorMsg('User Name Cant be Empty')
                return false
            }
           
        }
        if (!emailError) {
            
            if (checkEmpty(email)) {
                setEmailError(true)
                toast.error('Email Cant be Empty')
                setErrorMsg('Email Cant be Empty')
                return false
            }
            else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                setEmailError(true)
                toast.error('Invalid Email')
                setErrorMsg('Invalid Email')
                return false
            }
        }
        if (!passwordError) {
            if (checkEmpty(password)) {
                setPasswordError(true)
                toast.error('Password Cant be Empty')
                setErrorMsg('Password Cant be Empty')
                return false
            }
            else if (password.length < 8) {
                setPasswordError(true)
                toast.error('Invalid Password , Password must be Greater then 8 Characters')
                setErrorMsg('Invalid Password , Password must be Greater then 8 Characters')
                return false
            }
        }
        if (errorMSg === null) {
            onSubmit()
        }
    } 
     const writeUserDetails = async (user) => {
        if(selectedTab === 'Company'){
            await setDoc(doc(firestore, "users",user.uid), {
                Name:CompanyName,
                email:email,
                ph:'',
                userType:selectedTab,
                // date:new Date().now
             })
            .then((e)=>{
                setAccountCreated(true)
                setLoading(false)
                console.log('Company Created',e)
                toast.success('Company Registered Successfully')
                // user.sendEmailVerification()
            }
            )
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(error.message)
                console.log(errorCode, errorMessage);
            });
          }
          else{   
            await setDoc(doc(firestore, "users",user.uid), {
                Name:UserName,
                email:email,
                userType:selectedTab,
                // date:new Date().now
             })
            .then((e)=>{
                setAccountCreated(true)
                setLoading(false)
                console.log('User Created',e)
                toast.success('User Register Successfully')
                // user.sendEmailVerification()
            }
            )
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(error.message)
                console.log(errorCode, errorMessage);
            });  
          }
        
    }
    const onSubmit = async () => {
        setLoading(true)
        if(password === confirmPassword)
        {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                sendEmailVerification(userCredential.user)
                writeUserDetails(user)  
            })
            .catch((error) => {
                setLoading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(error.message)
                console.log(errorCode, errorMessage);
            });
        }
        else{
            setLoading(false);
            toast.error("Passowrd Not Matched")
            setErrorMsg("Passowrd Not Matched")
        }
        
      }
  return (
    <div className='signupimg ' >
    <div className='d-flex justify-content-center align-items-center pb-5' >
        <div className="col-md-8  col-11 col-lg-6 loginbg align-items-center my-5 bg-light px-md-3 pt-2 ">
            <p className="loginhead my-3">Register</p>
            <p className='logintxt text-muted'>Enter your details to get Registered</p>
            <nav className="d-flex navtab justify-content-center px-3">
                <TabSelector
                    isActive={selectedTab === "Company"}
                    onClick={() => setSelectedTab("Company")}
                >
                    Company
                </TabSelector>
                <TabSelector
                    isActive={selectedTab === "JobSeeker"}
                    onClick={() => setSelectedTab("JobSeeker")}
                >
                    Job Seeker
                </TabSelector>
            </nav>
            <div className="col-12 col-lg-12 d-grid justify-content-center m-0 px-lg-0 px-2">
                
                <TabPanel hidden={selectedTab !== "Company"}>
                <div className="row my-3">
                        <div className="col-md-6  col-12"> <label for="ControlInput1" className="formlabel ">Company Name</label>
                            <input type="text" className={`inputtextfield comname  ${CompanynameError ? ' border-red-500' : 'border-gray-500'}`} id="ControlInput1" placeholder="Company Name" value={CompanyName}  onChange={(e)=> {
                                setCompanyNameError(false);
                                setCompanyName(e.target.value);
                            }} />
                        </div>
                        <div className="col-md-6  col-12">
                            <label for="mControlInput2" className="formlabel">Email Address</label>
                            <input type="email" value={email} onChange={(e)=> {
                                 setEmailError(false);
                                setEmail(e.target.value);
                            }} className={`inputtextfield  ${emailError ? ' border-red-500' : 'border-gray-500'}`} id="ControlInput2" placeholder="companyname@gmail.com" />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-6  col-12"> <label for="ControlInput3" className="formlabel ">Password</label>
                            <input type="password" value={password} onChange={(e)=> {
                               setPasswordError(false);  
                               setPassword(e.target.value);
                            }}  className={`inputtextfield  ${passwordError ? ' border-red-500' : 'border-gray-500'}`} id="ControlInput3" placeholder="********" />
                        </div>
                        <div className="col-md-6  col-12">
                            <label for="mControlInput4" className="formlabel">Confirm Password</label>
                            <input type="password"  className="inputtextfield" id="ControlInput4" placeholder="********" value={confirmPassword} onChange={(e)=> {
                                setConfirmPassword(e.target.value);
                            }}   />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center"><Link  className='mainbtn col-lg-3 col-6 my-3' onClick={()=>{
                        validateData();
                    }}>Register</Link></div>
                     
                
                    <p className='text-center'>Already have an Account?
                    <Link to='../Login'>Login</Link>
                    </p>

                </TabPanel>
                {/* Job Seeker Section */}
                <TabPanel hidden={selectedTab !== "JobSeeker"}>

                <div className="row my-3">
                        <div className="col-md-6  col-12"> <label for="ControlInput1" className="formlabel ">User Name</label>
                            <input type="text" className={`inputtextfield comname  ${UserNameError ? ' border-red-500' : 'border-gray-500'}`} id="ControlInput1" placeholder="User Name" value={UserName} onChange={(e)=> {
                                setUserNameError(false);
                                setUserName(e.target.value);
                            }}   />
                        </div>
                        <div className="col-md-6  col-12"> <label for="ControlInput3" className="formlabel ">Email</label>
                            <input type="email" className={`inputtextfield  ${emailError ? ' border-red-500' : 'border-gray-500'}`} id="ControlInput44" placeholder="name@mail.com" value={email} onChange={(e)=> {
                                  setEmailError(false);
                                setEmail(e.target.value);
                            }}  />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-6  col-12"> <label for="ControlInput3" className="formlabel ">Password</label>
                            <input type="password" className={`inputtextfield  ${passwordError ? ' border-red-500' : 'border-gray-500'}`} id="ControlInput3" placeholder="********" value={password} onChange={(e)=> {
                                  setPasswordError(false);
                                setPassword(e.target.value);
                            }}  />
                        </div>
                        <div className="col-md-6  col-12">
                            <label for="mControlInput4" className="formlabel">Confirm Password</label>
                            <input type="password" className="inputtextfield" id="ControlInput4" placeholder="********" value={confirmPassword} onChange={(e)=> {
                                setConfirmPassword(e.target.value);
                            }}  />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center"><Link className='mainbtn col-lg-6 col-6 my-3' onClick={()=>{validateDatae()}}>Register</Link></div>
                   
                 
                    <p className='text-center'>Already have an Account?
                    <Link to='../Login'>Login</Link>
                    </p>
                </TabPanel>
            </div>


        </div>
      

    </div>
    </div>
  )
}

export default Signup