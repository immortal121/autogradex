"use client";
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { appName, serverURL } from '@/utils/utils';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from "@/utils/useAuth";



export default function Home() {
    
    useAuth();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [organization,setOrganization] = useState<string>("");

    const [verificationCodeSent, setVerificationCodeSent] = useState<boolean>(true);// set to false in production
    const [verificationCode, setVerificationCode] = useState<string>("hello world");

    const [loading, setLoading] = useState<boolean>(false); 

    const sendVerificationCode = async () => {
    //     setLoading(true);
    //     if (email == "" || name == "" || password == "") {
    //         setLoading(false);
    //         toast.error("Please fill out all fields!");
    //         return;
    //     }

    //     const config = {
    //         method: "POST",
    //         url: `${serverURL}/users/send-verification-code`,
    //         headers: {
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": `application/json`,
    //         },
    //         data: {
    //             "email": email
    //         }
    //     };

    //     axios(config)
    //         .then((response) => {
    //             toast.success("Verification Code Sent!");
    //             setVerificationCodeSent(true);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             toast.error("Something went wrong! Please try again later.");
    //             setLoading(false);
    //         });
    // }

    // const verifyEmail = async () => {
    //     if (email == "" || name == "" || password == "") {
    //         toast.error("Please fill out all fields!");
    //         return;
    //     }

    //     if (verificationCode == "") {
    //         toast.error("Please enter the verification code!");
    //         return;
    //     }

    //     const config = {
    //         method: "POST",
    //         url: `${serverURL}/users/verify-email`,
    //         headers: {
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": `application/json`,
    //         },
    //         data: {
    //             "email": email,
    //             "code": verificationCode,
    //         }
    //     };

    //     axios(config)
    //         .then((response) => {
    //             toast.success("Email verified!");
                signup();
    //         })
    //         .catch((error) => {
    //             toast.error("Something went wrong! Please try again later.");
    //         });
    }

    const signup = async () => {
        if (email == "" || name == "" || password == "") {
            toast.error("Please fill out all fields!");
            return;
        }

        const config = {
            method: "POST",
            url: `${serverURL}/aadmin/signup`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                "name": name,
                "email": email,
                "password": password,
                "organizationName":organization,
            }
        };

        axios(config)
            .then((response) => {
                toast.success("Account created!");
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 1000);
            })
            .catch((error) => {
                toast.error("Invalid Credentials !");
            });
    }

    return (
        <main className="w-screen h-screen bg-base-100 flex p-2 overflow-hidden">
            <div className='hidden md:flex flex-col text-white p-10 max-w-[30vw] bg-gradient-to-b to-purple-400 via-violet-500 from-indigo-600 h-full rounded-md'>
                <Link href={"/"}><p className="mb-10">🤖 {appName} 📝</p></Link>
                <p className="text-2xl font-semibold mb-2">
                    {appName} - AI Powered Exam Sheet Evaluator
                </p>
                <p className="opacity-70">Seamless Access, Effortless Evaluation: Welcome to EvaluateAI, Where Innovation Meets Intelligent Grading.</p>
            </div>
            <div className="animate-fade-in-bottom flex flex-col w-full h-full ml-2 rounded-md p-10">
            <Link className='flex flex-col md:hidden' href={"/"}><p className="mb-10">🤖 {appName} 📝</p></Link>
            
                <p className="font-bold text-xl mb-3">Sign Up</p>
                <p className="mb-5">Already have an account? <Link href={'/signin'}><label htmlFor="createchatbot_modal" className="btn btn-sm">Sign in</label></Link></p>
                <p className="text-sm mb-1">Full Name</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Full Name" type="text" onChange={(x) => setName(x.target.value)} value={name} />
                <p className="text-sm mb-1">Email</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Email" type="text" onChange={(x) => setEmail(x.target.value)} value={email} />
                <p className="text-sm mb-1">Password</p>
                
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Password" type="password" onChange={(x) => setPassword(x.target.value)} value={password} />
                <p className="text-sm mb-1">Organization</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Organization" type="text" onChange={(x) => setOrganization(x.target.value)} value={organization} />
                
                {verificationCodeSent && <div className="flex flex-col">
                    <p className="text-sm mb-1">Verification Code</p>
                    <input className="input input-bordered mb-5 max-w-xs" placeholder="Verification Code" type="text" onChange={(x) => setVerificationCode(x.target.value)} value={verificationCode} />
                </div>}
                <button className="btn btn-primary max-w-xs" onClick={() => {
                    // if (loading) return;
                    // if (!verificationCodeSent) {
                        sendVerificationCode();
                    // }
                    // else {
                        // verifyEmail();
                    // }
                }}>
                    {loading ? <span className="loading loading-spinner"></span> : verificationCodeSent ? "Create Account" : "Send Verification Code"}</button>
            </div>
            <ToastContainer />
        </main>
    )
}