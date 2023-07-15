import React, { useState } from 'react'
import './Login.scss'
// import { HalfMalf } from 'react-spinner-animated';

import {  sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../../firebase";
import { toast } from 'react-toastify';


const ForgetPassword = () => {
    const [emailError, setEmailError] = useState(false)
    const [msg, setMsg] = useState('')
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const checkEmpty = (value) => {
        if (value.length === 0) {
            return true
        }
    }
    const validateData = () => {
        setErrorMsg(null)
        if (!emailError) {
            console.log("Hello")
            if (checkEmpty(email)) {
                setEmailError(true)
                toast.error('Email Cant be Empty')
                setErrorMsg('Email Cant be Empty')
                return false
            }
            else if (!(/^w+([.-]?w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                setEmailError(true)
                toast.error('Invalid Email')
                setErrorMsg('Invalid Email')
                return false
            }
        }
        
        if (errorMsg == null) {
            sendEmail()
        }
    }
    const sendEmail = () => {
        sendPasswordResetEmail(auth, email).then(() => {
            setMsg('Email Sent Successfully')
        }).catch(() => {
            setMsg('Email Not Found')
        })
    }

    return (
        <div className='row m-0 p-0 forgetpage d-flex justify-content-center align-items-center '>
            <div className='col-md-5 col-10 px-3  my-2 loginbg'>
                <p className="loginhead pt-3">Forget Password</p>
                <p className='logintxt text-muted'>Reset Your Password through your Registered Email</p>

                <label for="ControlInput1" className="formlabel ">Email Address</label>
                <input type="email" className={`inputtextfield  ${emailError ? ' border-red-500' : 'border-gray-500'}`}  id="ControlInput1" placeholder="name@example.com" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <div className="d-flex justify-content-center">
                    <button className='mainbtn  my-3 col-4' onClick={() => { validateData() }}>Confirm</button>
                </div>
                {/* <HalfMalf text={"Loading..."} bgColor={"#F0A500"} center={false} width={"100px"} height={"100px"} /> */}
              

            </div>
        </div>
    )
}

export default ForgetPassword