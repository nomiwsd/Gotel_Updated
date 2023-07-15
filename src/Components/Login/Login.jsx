import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore, storage } from "../../firebase";

import { User } from '../../Objects/User'
import { toast } from 'react-toastify'
import './Login.scss'
import BounceLoader from "react-spinners/BounceLoader";

const Login = () => {
    const navigate = useNavigate()
    const [loogedInAsAdmin, setloogedInAsAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [, setSuccessMsg] = useState('')
    const [, setUser] = useState(new User())
    const [, setSignedIn] = useState(false)
    let [color, setColor] = useState("#007456");
    const checkEmpty = (value) => {
        if (value.length === 0) {
            return true
        }
    }
    const validateData = () => {
        setErrorMsg(null)
        if (!emailError) {
            if (checkEmpty(email)) {
                setEmailError(true)
                toast.error('Email Cant be Empty')
                setErrorMsg('Email Cant be Empty')
                return false
            }
            else if (!(/^w+([#.-]?w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
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
        if (errorMsg == null) {
            onSubmit()
        }
    }
    const fetchUserDetails = async (userFB) => {
        console.log(userFB.uid);
        await getDoc(doc(firestore, 'users', userFB.uid))
            .then(async (querySnapshot) => {
                if (querySnapshot.exists()) {
                    await getDownloadURL(ref(storage, `images/${userFB.uid}/profile`))
                        .then((imgurl) => {

                            console.log('Signed In with profile pic')
                            const users = new User(
                                userFB.uid,
                                email,
                                imgurl,
                                querySnapshot.data().Name,
                                querySnapshot.data().userType,
                            )
                            if (users.userType === 'Company') {
                                navigate('/Company', {
                                    state: {
                                        user: users,
                                    }

                                },
                                    toast.success('Company Login Successfully'))
                            }
                            else {
                                navigate('/JobSeeker', {
                                    state: {
                                        user: users,
                                    }
                                },
                                    toast.success('User Login Successfully'))
                            }
                            setUser(users)
                            localStorage.setItem('user', JSON.stringify(users));
                            setLoading(false)
                            setSignedIn(true)
                        })
                        .catch((error) => {
                            console.log('Signed In no profile pic')
                            const users = new User(
                                userFB.uid,
                                email,
                                null,
                                querySnapshot.data().Name,
                                querySnapshot.data().userType,
                            )
                            if (users.userType === 'Company') {
                                navigate('/Company', {
                                    state: {
                                        user: users,
                                    }
                                })
                            }
                            else {
                                navigate('/JobSeeker', {
                                    state: {
                                        user: users,
                                    }
                                })
                            }

                            setUser(users)
                            localStorage.setItem('user', JSON.stringify(users));
                            setLoading(false)
                            setSignedIn(true)
                            console.log(error.message)
                        })
                }
            })
            .catch((e) => {
                console.log(e)
            })

    }
    const onSubmit = async () => {
        console.log(new Date())
        if (email === 'nomimalik8051@gmail.com' && password === '123456789') {
            // console.log('Looged In as Admin')
            toast.success('Admin Login Successfully');
            setSuccessMsg('Admin Login Successfully')
            setloogedInAsAdmin(true)
        }
        else {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    fetchUserDetails(user);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    setErrorMsg(error.message)
                    setLoading(false)
                });
        }

    }

    if (loogedInAsAdmin) {
        return (
            <Navigate to={'/Admin'} />
        )
    }
    else {
        return (
            <div className='relative row m-0 p-0 loginpage d-flex justify-content-center align-items-center '>
                <div className='loginbg col-md-5 col-10 px-3 my-2 '>
                    <p className="loginhead pt-3">Login</p>
                    <p className='logintxt text-muted'>Login with the Data you entered during your Registration</p>
                    <label for="ControlInput1" className="formlabel">Email Address</label>
                    <input type="email" className={`inputtextfield  ${emailError ? ' border-red-500' : 'border-gray-500'}`} id="ControlInput1" placeholder="name@example.com" value={email} onChange={(e) => {
                        setEmailError(false);
                        setEmail(e.target.value);
                    }} />

                    <label for="mControlInput2" className="formlabel">Password</label>
                    <input type="password" className={`inputtextfield  ${passwordError ? ' border-red-500' : 'border-gray-500'}`} id="ControlInput2" placeholder="******" value={password} onChange={(e) => {
                        setPasswordError(false);
                        setPassword(e.target.value);
                    }} />
                    <div className="d-flex justify-content-center"><Link onClick={() => {
                        validateData()
                    }} className='mainbtn  my-3 col-4'>Login</Link>
                    </div>

                    <Link to='../ForgetPassword' className='forgetpswd'>
                        <p className='forgetpswd text-danger'>
                            Did you Forget your Password?</p>
                    </Link>

                    <div className='signuppagelink border-1 border-secondary py-3 px-4 mb-2'>
                        <p className="signuphead h5">Signup</p>
                        <p className='signuptxt text-muted'>Register your Account First!</p>
                        <Link to='../Signup' className='btn createbtn my-3'>Create Account</Link>
                    </div>

                </div>
                {
                    loading ?
                        <div className=' absolute w-full h-full left-0 top-0 bg-black bg-opacity-25 flex justify-center items-center'>
                            <BounceLoader
                                color={color}
                                loading={loading}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div> : <></>
                }
            </div>
        )
    }
}
export default Login