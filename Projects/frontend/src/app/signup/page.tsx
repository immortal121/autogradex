"use client";
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { appName, serverURL } from '@/utils/utils';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {


  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("Organization 1");
  const [userRole, setUserRole] = useState<number>(0); // Default to student
  const [organizations, setOrganizations] = useState([]);

  const [password, setPassword] = useState<string>("");
  const [verificationCodeSent, setVerificationCodeSent] = useState<boolean>(true);
  const [verificationCode, setVerificationCode] = useState<string>("helloworld");
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("token")) {
        switch(parseInt(localStorage.getItem("type"))){
          case 3:
              window.location.href = "/super_admin";
              break;
          case 2:
              window.location.href = "/admin";
              break;
          case 1:
              window.location.href = "/teacher";
              break;
          case 0:
              window.location.href = "/student";
              break;
          
      }
      }
    }


    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${serverURL}/users/organizations`);
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  //   const [verificationCodeSent, setVerificationCodeSent] = useState<boolean>(false);
  //   const [verificationCode, setVerificationCode] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  //   const sendVerificationCode = async () => {
  //     setLoading(true);
  //     if (email == "" || name == "" || password == "") {
  //       setLoading(false);
  //       toast.error("Please fill out all fields!");
  //       return;
  //     }

  //     const config = {
  //       method: "POST",
  //       url: `${serverURL}/users/send-verification-code`,
  //       headers: {
  //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": `application/json`,
  //       },
  //       data: {
  //         "email": email
  //       }
  //     };

  //     axios(config)
  //       .then((response) => {
  //         toast.success("Verification Code Sent!");
  //         setVerificationCodeSent(true);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         toast.error("Something went wrong! Please try again later.");
  //         setLoading(false);
  //       });
  //   }

  const verifyEmail = async () => {
    if (email == "" || name == "" || password == "") {
      toast.error("Please fill out all as fields!");
      return;
    }

    // if (verificationCode == "") {
    //   toast.error("Please enter the verification code!");
    //   return;
    // }

    // const config = {
    //   method: "POST",
    //   url: `${serverURL}/users/verify-email`,
    //   headers: {
    //     "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //     "Content-Type": `application/json`,
    //   },
    //   data: {
    //     "email": email,
    //     "code": verificationCode,
    //   }
    // };

    // axios(config)
    //   .then((response) => {
    //     toast.success("Email verified!");
    signup();
    //   })
    //   .catch((error) => {
    //     toast.error("Something went wrong! Please try again later.");
    //   });
  }

  const signup = async () => {
    if (email == "" || name == "" || password == "" || organizationName == "") {
      toast.error("Please fill out all fields!");
      return;
    }

    const config = {
      method: "POST",
      url: `${serverURL}/users/signup`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        "name": name,
        "email": email,
        "password": password,
        "userRole": userRole,
        "organizationName": organizationName,
      }
    };

    axios(config)
      .then((response) => {
        toast.success("Account created!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  }

  return (
    <main className="w-screen h-screen bg-base-100 flex p-2 overflow-hidden">
      <div className='flex flex-col text-white p-10 max-w-[30vw] bg-gradient-to-b to-purple-400 via-violet-500 from-indigo-600 h-full rounded-md'>
        <Link href={"/"}><p className="mb-10">🤖 {appName} 📝</p></Link>
        <p className="text-2xl font-semibold mb-2">
          {appName} - AI Powered Exam Sheet Evaluator
        </p>
        <p className="opacity-70">Seamless Access, Effortless Evaluation: Welcome to EvaluateAI, Where Innovation Meets Intelligent Grading.</p>
      </div>
      <div className="animate-fade-in-bottom flex flex-col w-full h-full ml-2 rounded-md p-10">
        <p className="font-bold text-xl mb-3">Sign Up</p>
        <p className="mb-5">Already have an account? <Link href={'/login'}><label htmlFor="createchatbot_modal" className="btn btn-sm">Login</label></Link></p>
        <p className="text-sm mb-1">Full Name</p>
        <input className="input input-bordered mb-5 max-w-xs" placeholder="Full Name" type="text" onChange={(x) => setName(x.target.value)} value={name} />
        <p className="text-sm mb-1">Email</p>
        <input className="input input-bordered mb-5 max-w-xs" placeholder="Email" type="text" onChange={(x) => setEmail(x.target.value)} value={email} />
        <p className="text-sm mb-1">Password</p>
        <input className="input input-bordered mb-5 max-w-xs" placeholder="Password" type="password" onChange={(x) => setPassword(x.target.value)} value={password} />
        <p className="text-sm mb-1">User Role</p>
        <select className="input input-bordered mb-5 max-w-xs" value={userRole} onChange={(e) => setUserRole(parseInt(e.target.value))}>
          <option value="2">Admin</option>
          <option value="1">Teacher</option>
          <option value="0">Student</option>
        </select>
        {userRole === 2 && (
          <div>
            <p className="text-sm mb-1">Organization Name</p>
            <input className="input input-bordered mb-5 max-w-xs" placeholder="Organization Name" type="text" onChange={(x) => setOrganizationName(x.target.value)} value={organizationName} />
          </div>
        )}
        {userRole !== 2 && (
          <div>
            <p className="text-sm mb-1">Organization Name</p>
            {/* Replace with your actual organization options */}
            <select
            className="input input-bordered mb-5 max-w-xs"
              id="organization"
              value={organizationName}
              onChange={(x) => setOrganizationName(x.target.value)} 
            >
              <option value="">Select Organization</option>
              {organizations.map((org) => (
                <option key={org._id} value={org.name}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* {verificationCodeSent && (
          <div className="flex flex-col">
            <p className="text-sm mb-1">Verification Code</p>
            <input className="input input-bordered mb-5 max-w-xs" placeholder="Verification Code" type="text" onChange={(x) => setVerificationCode(x.target.value)} value={verificationCode} />
          </div>
        )} */}
        <button className="btn btn-primary max-w-xs" onClick={() => {
          if (loading) return;
          if (!verificationCodeSent) {
            // sendVerificationCode();
          } else {
            verifyEmail();
          }
        }}>{loading ? <span className="loading loading-spinner"></span> : verificationCodeSent ? "Create Account" : "Send Verification Code"}</button>
      </div>
      <ToastContainer />
    </main>
  )
}