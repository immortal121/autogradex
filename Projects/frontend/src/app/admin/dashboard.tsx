"use client";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { appName } from '@/utils/utils';
import React, { useContext, useEffect, useState } from 'react';
import { FiArrowLeft, FiCreditCard, FiDollarSign, FiHelpCircle, FiHome, FiLogOut, FiMoreHorizontal, FiShoppingCart, FiUser, FiUsers } from "react-icons/fi";
import { Context, MainContext } from '@/context/context';
import { SpaceDashboardOutlined,SchoolOutlined, CastForEducationOutlined,PersonOutlined,CreateOutlined} from '@mui/icons-material';
import { SidebarItem, SubSidebarItem } from "@/utils/sidebaritems";
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { Stack } from '@mui/material';


export default function Home({
  children,
}: {
  children: React.ReactNode
}) {
  const [showMenu, setShowMenu] = useState(true);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const pathname = usePathname();

  const { getEvaluators, user } = useContext(MainContext);

  useEffect(() => {
    getEvaluators();

    if (typeof window !== 'undefined') {
      if (pathname === "/admin") window.location.href = "/admin/dashboard";

      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
      } else {
        getEvaluators();
        let data = parseInt(localStorage.getItem("type"));
        
        
        switch (data) {
          case 2:
            window.location.href = "/teacher";
            break;
          case 0:
            window.location.href = "/super_admin";
            break;
          case 3:
            window.location.href = "/student";
            break;
        }
      }
    }
  }, []);

  return (

    <main className="flex bg-base-100 h-screen w-screen p-2 max-sm:p-0" onClick={() => {
      if (moreMenuOpen) setMoreMenuOpen(false);
    }}>
      {/* Sidebar */}
      <div className={'print flex flex-col p-5 min-w-[275px] max-w-[15vw] h-full rounded-md ' + (!showMenu ? "max-sm:hidden " : "max-sm:fixed max-sm:w-full max-sm:h-full max-sm:max-w-none bg-base-100 max-sm:z-50 ")}>
        <div className="flex justify-between items-center max-sm:mb-4">
          <Link href="/"><div className="mb-5 font-semibold max-sm:mb-3" >🤖 {appName} 📝</div></Link>
          <div className="hidden max-sm:flex justify-end mb-3">
            <button className="btn btn-square btn-sm" onClick={() => setShowMenu(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className='p-0 my-2 h-full w-full overflow-hidden hover:overflow-y-auto'>
          <div className="p-0 w-full overflow-hidden hover:overflow-y-auto dropdown dropdown-top">
            <Link href="/admin"><label className={'btn-ghost btn w-full justify-start normal-case'} onClick={() => { }}><SpaceDashboardOutlined />Dashboard</label></Link>
          </div>     
          <SidebarItem label="Teacher Management" icon={<SchoolOutlined />}>
            <SubSidebarItem href="/admin/teacher" label="Teachers" icon={undefined} />
          </SidebarItem>
          <SidebarItem label="Student Management" icon={<PersonOutlined />} >
            <SubSidebarItem href="/admin/student" label="Students" icon={undefined} />
          </SidebarItem>
          <SidebarItem label="Class Management" icon={<CastForEducationOutlined />} >
            <SubSidebarItem href="/admin/classes" label="Classes" icon={undefined} />
          </SidebarItem>
          
          <SidebarItem label="Exam Management" icon={<CreateOutlined/>} >
            <SubSidebarItem href="/admin/assignment" label="Assignments" icon={undefined} />
          </SidebarItem>
        </div>
        <hr />

        <div tabIndex={0} className='cursor-pointer dropdown dropdown-top flex items-center hover:bg-base-200 p-2 rounded-lg'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <div className="avatar placeholder mr-2">
                <div className="bg-blue-700 text-white mask mask-squircle w-10">
                  <span><FiUser /></span>
                </div>
              </div>
              <p className='font-semibold'>{user?.name}</p>
            </div>
            <FiMoreHorizontal />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2">
            <hr className='my-2' />
            <li className='flex' onClick={() => {
              localStorage.clear()
              window.location.href = "/";
            }}><p><FiLogOut className="text-red-600" />Logout</p></li>
          </ul>
        </div>
      </div>
      {/* Main */}
      {children}

    </main >
  )
}
