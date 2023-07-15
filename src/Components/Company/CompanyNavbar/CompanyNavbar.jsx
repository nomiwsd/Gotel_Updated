import React from 'react'
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { BiMessageDetail } from 'react-icons/bi'
import { Link } from "react-router-dom";
import { BsPeopleFill } from 'react-icons/bs'
import { MdWorkOutline, MdPostAdd } from 'react-icons/md'
import { FaUserPlus } from 'react-icons/fa'
import { setDoc, doc as Doc, addDoc, getDocs,updateDoc, docR, getDoc, collection,onSnapshot } from "@firebase/firestore";
import { firestore, storage } from '../../../firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';

const CompanyNavbar = ({userProfileimg}) => {
    var [user, setUser] = useState({})
    const [image,setImage] = useState('')
    const [unReadMsgs,setUnReadMsgs] = useState(0)
    useEffect(() => {
      var company = localStorage.getItem('user')
      company = JSON.parse(company)
      setUser(company)
      fetchUsersDetails(company.uid)
  }, [])  
  const fetchUsersDetails = async (uid)=>{
      onSnapshot(collection(firestore,`users/${uid}/chat`),(msgs)=>{
        setUnReadMsgs(0)
        msgs.docs.map((msg,index)=>{
          setUnReadMsgs(unReadMsgs => (unReadMsgs + msg.data().unreadcompany))
        })
      })
  }
  return (
    <div className="navbar p-2">
      <div className="wrapper p-2">
        <div className="moduleName d-flex justfy-content-center">
          <div className="">
            <ListOutlinedIcon className="icon d-block d-md-none" data-bs-toggle="offcanvas" data-bs-target="#smalloffcanvas" aria-controls="smalloffcanvas" />
            <div class="offcanvas offcanvas-start smoffcannvas" tabindex="-1" id="smalloffcanvas" aria-labelledby="offcanvasLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasLabel">GOTEL</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <div className=" smallsidebar border-0" >
                  <div className="sidebar" >
                    <hr />
                    <div className="center">
                      <ul>
                        <Link to="/Company" style={{ textDecoration: "none" }}>
                          <li>
                            <BsPeopleFill className="icon fs-4" />
                            <span>Company Profile</span>
                          </li>
                        </Link>
                        <Link to="/Postjob" style={{ textDecoration: "none" }}>
                          <li>
                            <MdWorkOutline className="icon fs-4" />
                            <span>Post a Job</span>
                          </li>
                        </Link>
                        <Link to='/PostedJob' style={{ textDecoration: "none" }}>
                          <li>
                            <MdPostAdd className="icon fs-4" />
                            <span>Posted Jobs</span>
                          </li></Link>
                        <Link to='/AppliedCandidate' style={{ textDecoration: "none" }}>
                          <li>
                            <FaUserPlus className="icon fs-4" />
                            <span>Applied Candidates</span>
                          </li></Link>
                        <Link to='/CompanyMessage' style={{ textDecoration: "none" }}>   <li>
                          <BiMessageDetail className="icon fs-4" />
                          <span>Messages</span>
                        </li>
                        </Link>
                        <Link to='/CompanySettingspage' style={{ textDecoration: "none" }}> <li>
                          <SettingsApplicationsIcon className="icon fs-4" />
                          <span>Settings</span>
                        </li></Link>
                        <Link to='/Login' style={{ textDecoration: "none" }}> <li>
                          <ExitToAppIcon className="icon fs-4" />
                          <span>Logout</span>
                        </li></Link>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        <div className="items">
        <p className='topheading m-0 p-0 me-2'>Company</p>
          <Link className="item d-none d-md-flex" to={'/CompanyMessage'} >
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">{unReadMsgs}</div>
          </Link>
          <div className="item">
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyNavbar