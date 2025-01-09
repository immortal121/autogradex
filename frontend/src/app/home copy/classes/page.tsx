"use client";
import { useContext, useState } from "react";
import { FiUser, FiEdit, FiTrash, FiPlusCircle, FiUsers, FiBook, FiHash, FiPrinter, FiDownload, FiHelpCircle } from "react-icons/fi";
import { MainContext } from "@/context/context";
import { appName } from "@/utils/utils";
import { FaFileImport } from "react-icons/fa";
import { TbFileImport } from "react-icons/tb";

export default function Classes() {
  const {
    setSelectedEvaluator,
    classes,
    selectedClass,
    students,
    newStudentName,
    setNewStudentName,
    newStudentRollNo,
    setNewStudentRollNo,
    setDeleteStudentRollNo,
    addStudent,
    deleteStudent,
    editStudentRollNo,
    setEditStudentRollNo,
    editStudentName,
    setEditStudentName,
    editStudent,
    handleStudentFileChange
  } = useContext(MainContext);

  const [search, setSearch] = useState("");

  return (
    classes.length === 0 ? <div className="animate-fade-in-bottom flex flex-col w-full max-sm:max-w-none">
      <div className='select-none flex flex-col justify-center items-center w-full h-full'>
        <p className='text-5xl font-semibold mb-2'>🤖 {appName} 📝</p>
        <p className='text-center'>Create a new evaluator or select an existing evaluator to get started.</p>
        <div className='flex flex-wrap justify-center mt-7'>
          <div className='bg-base-300 rounded-lg p-4 hover:bg-base-200 max-w-xs m-2'>
            <p className='font-semibold text-md mb-2'>🤖 AI-Powered Evaluation</p>
            <p className='text-sm opacity-70'>Leverage cutting-edge AI for accurate and efficient grading.</p>
          </div>
          <div className='bg-base-300 rounded-lg p-4 hover:bg-base-200 max-w-xs m-2'>
            <p className='font-semibold text-md mb-2'>📊 Detailed Result Insights</p>
            <p className='text-sm opacity-70'>Explore detailed insights for a holistic view of student performance.</p>
          </div>
          <div className='bg-base-300 rounded-lg p-4 hover:bg-base-200 max-w-xs m-2'>
            <p className='font-semibold text-md mb-2'>👥 Effortless Class Management</p>
            <p className='text-sm opacity-70'>Create, organize, and add students with ease.</p>
          </div>
        </div>
      </div>
    </div> : <div className="animate-fade-in-bottom flex flex-col w-full max-w-[50vw] max-sm:max-w-none">
      <div className="hidden max-sm:flex justify-end mb-3">
        <button className="btn btn-square" onClick={() => setSelectedEvaluator(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="flex items-center justify-between mb-1 mt-4 w-full max-w-lg">
        <p className="flex items-center font-semibold text-xl"><FiBook className="mr-2" /> {classes[selectedClass]?.subject} <FiUsers className="ml-5 mr-2" /> {classes[selectedClass]?.name} {classes[selectedClass]?.section}</p>
      </div>
      <div className="print flex mt-5">
        <label htmlFor="newstudent_modal" className="btn btn-primary mr-2" onClick={() => setNewStudentRollNo(students.length + 1)}>+ New Student</label>
        <label htmlFor="uploadCSVFile" className="btn rounded-r-none"><TbFileImport /> Import Students<input
          id="uploadCSVFile"
          type="file"
          accept=".csv"
          onChange={handleStudentFileChange}
          className="hidden"
        /></label>
        <div className="tooltip" data-tip="Help"><label htmlFor="help_modal" className="btn btn-square mr-2 rounded-l-none"><FiHelpCircle /></label></div>
        {students.length > 0 ?
          <div className="flex items-center w-full justify-between">
            <button className='btn mr-2' onClick={() => {
              const csvHeader = "RollNo,Name\n";
              const csvRows = students.map((student: any) =>
                `${student.rollNo},${student.name}`
              ).join("\n");

              const csv = csvHeader + csvRows;
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;

              // Download the CSV
              a.download = 'students.csv';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}><FiDownload />Download</button>

            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" />
          </div>
          : ""}
      </div>
      <div className="overflow-y-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>RollNo</th>
              <th>Name</th>
              <th className="print">Edit</th>
              <th className="print">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((student: any, i: any) =>
                student.name.toLowerCase().includes(search.toLowerCase()) &&
                (
                  <tr key={i}>
                    <th>{student?.rollNo}</th>
                    <td>{student?.name}</td>
                    <td className="print"><label htmlFor="editstudent_modal" className="btn btn-square" onClick={() => {
                      setEditStudentRollNo(student.rollNo);
                      setEditStudentName(student.name);
                    }}><FiEdit /></label></td>
                    <td className="print"><label htmlFor="deletestudent_modal" className="btn btn-square" onClick={() => setDeleteStudentRollNo(student.rollNo)}><FiTrash /></label></td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      {/* New Student Modal */}
      <input type="checkbox" id="newstudent_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiPlusCircle className="mr-1" /> New Student</h3>
          <p className="flex items-center py-4"><FiHash className='mr-2' />Roll No</p>
          <input className="input input-bordered w-full" placeholder="Roll No" type="number" onChange={(x) => setNewStudentRollNo(parseInt(x.target.value))} value={newStudentRollNo} />
          <p className="flex items-center py-4"><FiUser className='mr-2' />Student Name</p>
          <input className="input input-bordered w-full" placeholder="Student Name" type="text" onChange={(x) => setNewStudentName(x.target.value)} value={newStudentName} />
          <div className="modal-action">
            <label htmlFor="newstudent_modal" className="btn">Cancel</label>
            <label htmlFor="newstudent_modal" className="btn btn-primary" onClick={() => addStudent()}>Add Student</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="newstudent_modal">Cancel</label>
      </div>
      {/* Delete Student Modal */}
      <input type="checkbox" id="deletestudent_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiTrash className="mr-1" /> Delete Student</h3>
          <p className="py-4">Are you sure want to delete this student?</p>
          <div className="modal-action">
            <label htmlFor="deletestudent_modal" className="btn">Cancel</label>
            <label htmlFor="deletestudent_modal" className="btn btn-error" onClick={() => deleteStudent()}>Delete</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="deletestudent_modal">Cancel</label>
      </div>
      {/* Edit Student Modal */}
      <input type="checkbox" id="editstudent_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiEdit className="mr-1" /> Edit Student</h3>
          <p className="flex items-center py-4"><FiHash className='mr-2' />Roll No</p>
          <p className="flex items-center py-4">{editStudentRollNo}</p>
          <p className="flex items-center py-4"><FiUser className='mr-2' />Student Name</p>
          <input className="input input-bordered w-full" placeholder="Student Name" type="text" onChange={(x) => setEditStudentName(x.target.value)} value={editStudentName} />
          <div className="modal-action">
            <label htmlFor="editstudent_modal" className="btn">Cancel</label>
            <label htmlFor="editstudent_modal" className="btn btn-primary" onClick={() => editStudent()}>Save</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="editstudent_modal">Cancel</label>
      </div>
      {/* Import Help */}
      <input type="checkbox" id="help_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><TbFileImport className="mr-1" /> Import Students</h3>
          <p className="py-4">Create a CSV file with the following columns: <br />RollNo, Name<br />  Then import the file to add students.</p>
          <div className="modal-action">
            <label htmlFor="help_modal" className="btn">OK</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="help_modal">Cancel</label>
      </div>
    </div>
  );
}
