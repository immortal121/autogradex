"use client";
import { useContext, useState } from "react";
import { FiUser, FiEdit, FiTrash, FiPlusCircle, FiUsers, FiBook, FiHash, FiPrinter, FiDownload, FiHelpCircle } from "react-icons/fi";
import { MainContext } from "@/context/context";
import Link from 'next/link';
import { appName} from "@/utils/utils";
import { FaFileImport } from "react-icons/fa";
import { TbFileImport } from "react-icons/tb";

import { RemoveRedEyeOutlined,EditOutlined,CastForEducationOutlined,DeleteOutlined  } from '@mui/icons-material';
export default function Classes() {
    const {
        setSelectedEvaluator,classes,getClasses,
        selectedClass,
        newClassName,
        setNewClassName,
        newClassSection,
        setNewClassSection,
        newClassSubject,
        setNewClassSubject,
        deleteClass
        ,setSelectedClass,
        editClass,createClass,
        handleStudentFileChange
    } = useContext(MainContext);

    const [search, setSearch] = useState("");
    getClasses();
    
    // classes.map((c: any, i: any) =>{
    //     console.log(c.name);
    // })
    console.log(classes[0])
    return (<div className="animate-fade-in-bottom flex flex-col w-full p-10 max-sm:max-w-none">
        
                <div className="flex items-center justify-between mb-1 mt-4 w-full max-w-lg">
                    <p className="flex items-center font-semibold text-xl"><CastForEducationOutlined className="mr-2" /> Classes</p>
                </div>
        <div className="print flex mt-5">
            <label htmlFor="newclass_modal" className="btn btn-primary mr-2" onClick={() => setSelectedClass(classes.length + 1)}>+ New Class</label>
            {classes.length > 0 ?
                <div className="flex items-center w-full justify-between">
                    <button className='btn mr-2' onClick={() => {
                        const csvHeader = "Id,Name,Section,Students\n";
                        const csvRows = classes.map((c: any) =>
                            `${c.id},${c.name},${c.section},${c.students}`
                        ).join("\n");

                        const csv = csvHeader + csvRows;
                        const blob = new Blob([csv], { type: 'text/csv' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;

                        // Download the CSV
                        a.download = 'classes.csv';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }}><FiDownload />Download</button>

                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" />
                </div>
                : ""}
        </div>
        <div className="mt-5 overflow-y-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Section</th>
                        <th>Students</th>
                        <th className="print">View</th>
                        <th className="print">Edit</th>
                        <th className="print">Delete</th>
                    </tr>
                </thead>
                <tbody className="">
                    {

                        classes.map((c: any, i: any) =>
                            c.name.toLowerCase().includes(search.toLowerCase()) &&
                            (
                                <tr key={i}>
                                    <th>{c?._id}</th>
                                    <td>{c?.name}</td>                                    
                                    <td>{c?.section}</td>
                                    <td>10</td>
                                    <td className="print"><Link href='/admin/classes' className="btn btn-square" onClick={() => {
                                        setSelectedClass(c.id);
                                    }}><RemoveRedEyeOutlined /></Link></td>
                                    <td className="print"><label htmlFor="editclass_modal" className="btn btn-square" onClick={() => {
                                        setSelectedClass(c.id);
                                    }}><EditOutlined /></label></td>
                                    <td className="print"><label htmlFor="deleteclass_modal" className="btn btn-square" onClick={() => setSelectedClass(c.id)}><DeleteOutlined /></label></td>
                                </tr>
                            ))
                            
                    }
                    {

classes.map((c: any, i: any) =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (
        <tr key={i}>
            <th>{0}</th>
            <td>{c?.name}</td>                                    
            <td>{c?.section}</td>
            <td>10</td>
            <td className="print"><Link href='/admin/classes' className="btn btn-square" onClick={() => {
                setSelectedClass(c.id);
            }}><RemoveRedEyeOutlined /></Link></td>
            <td className="print"><label htmlFor="editclass_modal" className="btn btn-square" onClick={() => {
                setSelectedClass(c.id);
            }}><EditOutlined /></label></td>
            <td className="print"><label htmlFor="deleteclass_modal" className="btn btn-square" onClick={() => setSelectedClass(c.id)}><DeleteOutlined /></label></td>
        </tr>
    ))
    
}{

classes.map((c: any, i: any) =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (
        <tr key={i}>
            <th>{0}</th>
            <td>{c?.name}</td>                                    
            <td>{c?.section}</td>
            <td>10</td>
            <td className="print"><Link href='/admin/classes' className="btn btn-square" onClick={() => {
                setSelectedClass(c.id);
            }}><RemoveRedEyeOutlined /></Link></td>
            <td className="print"><label htmlFor="editclass_modal" className="btn btn-square" onClick={() => {
                setSelectedClass(c.id);
            }}><EditOutlined /></label></td>
            <td className="print"><label htmlFor="deleteclass_modal" className="btn btn-square" onClick={() => setSelectedClass(c.id)}><DeleteOutlined /></label></td>
        </tr>
    ))
    
}
                </tbody>
            </table>
        </div>
        {/* New Class Modal */}
        <input type="checkbox" id="newclass_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiPlusCircle className="mr-1" /> New Class</h3>
                <p className="flex items-center py-4"><FiUser className='mr-2' />Name</p>
                <input className="input input-bordered w-full" placeholder="Name" type="text" onChange={(x) => setNewClassName(x.target.value)} value={newClassName} />
                <p className="flex items-center py-4"><FiUser className='mr-2' />Section</p>
                <input className="input input-bordered w-full" placeholder="Section" type="text" onChange={(x) => setNewClassSection(x.target.value)} value={newClassSection} />
                <p className="flex items-center py-4"><FiUser className='mr-2' />Subject</p>
                <input className="input input-bordered w-full" placeholder="Subject" type="text" onChange={(x) => setNewClassSubject(x.target.value)} value={newClassSubject} />
                
                <div className="modal-action">
                    <label htmlFor="newclass_modal" className="btn">Cancel</label>
                    <label htmlFor="newclass_modal" className="btn btn-primary" onClick={() => createClass()}>Add Class</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="newstudent_modal">Cancel</label>
        </div>
        {/* Delete Class Modal */}
        <input type="checkbox" id="deleteclass_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiTrash className="mr-1" /> Delete Student</h3>
                <p className="py-4">Are you sure want to delete this student?</p>
                <div className="modal-action">
                    <label htmlFor="deleteclass_modal" className="btn">Cancel</label>
                    <label htmlFor="deleteclass_modal" className="btn btn-error" onClick={() => deleteClass()}>Delete</label>
                </div>
            </div>

            <label className="modal-backdrop" htmlFor="deleteclass_modal">Cancel</label>
        </div>
        {/* Edit Class Modal */}
        <input type="checkbox" id="editclass_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiEdit className="mr-1" /> Edit Student</h3>
                <p className="flex items-center py-4"><FiHash className='mr-2' />Roll No</p>
                <p className="flex items-center py-4">{selectedClass}</p>
                <p className="flex items-center py-4"><FiUser className='mr-2' />Student Name</p>
                <input className="input input-bordered w-full" placeholder="Student Name" type="text" onChange={(x) => setNewClassName(x.target.value)} value={newClassName} />
                <div className="modal-action">
                    <label htmlFor="editclass_modal" className="btn">Cancel</label>
                    <label htmlFor="editclass_modal" className="btn btn-primary" onClick={() => editClass()}>Save</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="editclass_modal">Cancel</label>
        </div>
        

    </div>
    );
}
