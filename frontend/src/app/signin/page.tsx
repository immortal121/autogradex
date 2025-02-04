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

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/users/signin`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                "email": email,
                "password": password,
            }
        };

        axios(config)
            .then((response) => {
                toast.success("Logged In!");
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                
                localStorage.setItem("type", response.data.user.role);
                window.location.href = (() => {
                    switch (response.data.user.role) {
                      case 0:
                        return "/super-admin"; // Redirect to admin dashboard
                      case 1:
                        return "/admin"; // Redirect to super admin dashboard (optional)
                      case 2:
                        return "/teacher"; // Redirect to teacher dashboard
                      case 3:
                        return "/student"; // Redirect to student dashboard
                      default:
                        return "/student"; // Default redirect to home page
                    }
                  })();
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
                <p className="font-bold text-xl mb-3">Sign In</p>
                <p className="mb-5">Don&apos;t have an account? <Link href={'/signup'}><label htmlFor="createchatbot_modal" className="btn btn-sm">Sign up</label></Link></p>
                <p className="text-sm mb-1">Email</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Email" type="text" onChange={(x) => setEmail(x.target.value)} value={email} />
                <p className="text-sm mb-1">Password</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Password" type="password" onChange={(x) => setPassword(x.target.value)} value={password} />
                <button className="btn btn-primary max-w-xs" onClick={() => login()}>Login</button>
            </div>
            <ToastContainer />
        </main>
    )
}