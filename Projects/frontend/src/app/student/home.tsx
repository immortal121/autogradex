"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { FiHome, FiMoreHorizontal, FiSettings, FiUser, FiLogOut, FiFileText, FiEdit, FiTrash, FiArrowRight, FiShoppingCart, FiShoppingBag, FiType, FiPlusCircle, FiKey, FiUsers, FiBook, FiInfo } from "react-icons/fi";
import Link from "next/link";
import { appName } from "@/utils/utils";
import { UploadButton } from "@/utils/uploadthing";
import { MainContext } from "@/context/context";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

export default function Home({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    moreMenuOpen,
    setMoreMenuOpen,
    showMenu,
    setShowMenu,
    user,
    selectedTab,
    setSelectedTab,
    limits,
    evaluators,
    selectedEvaluator,
    setSelectedEvaluator,
    newEvaluatorTitle,
    setNewEvaluatorTitle,
    newEvaluatorQuestionPapers,
    setNewEvaluatorQuestionPapers,
    newEvaluatorAnswerKeys,
    setNewEvaluatorAnswerKeys,
    classes,
    selectedClass,
    setSelectedClass,
    getEvaluators,
    getClasses,
    createEvaluator,
    deleteEvaluator,
    getStudents,
    newEvaluatorClassId,
    setNewEvaluatorClassId,
    setEditClassName,
    setEditClassSection,
    setEditClassSubject,
    editClassName,
    editClassSection,
    editClassSubject,
    editClass,
    createClass,
    deleteClass,
    newClassName,
    setNewClassName,
    newClassSection,
    setNewClassSection,
    newClassSubject,
    setNewClassSubject,
    editEvaluatorTitle,
    setEditEvaluatorTitle,
    editEvaluatorClassId,
    setEditEvaluatorClassId,
    editEvaluator,
    ongoingEvaluation,
    getEvaluationProgressSSE,
    convertPDFToImage
  } = useContext(MainContext);

  const pathname = usePathname();
  const newClassModalRef = useRef<any | null>(null);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
       
      }else{
        getEvaluators();
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
          <Link href="/"><div className="mb-5 font-semibold max-sm:mb-3" onClick={() => setSelectedEvaluator(-1)}>🤖 {appName} 📝</div></Link>
          <div className="hidden max-sm:flex justify-end mb-3">
            <button className="btn btn-square btn-sm" onClick={() => setShowMenu(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        
        <div className='p-0 my-2 h-full w-full overflow-hidden hover:overflow-y-auto'>
          <Link href="/student"><label className={(!pathname.includes("/student") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiHome /> Dashboard</label></Link>
          <Link href="/student/assignment"><label className={(!pathname.includes("/student/assignment") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiFileText /> Assignment</label></Link>
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
            {/* <Link href="/shop"><label><li className='flex'><p><FiShoppingCart />Shop</p></li></label></Link> */}
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
  );
}
