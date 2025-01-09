"use client";
import { useContext, useState } from "react";
import { FiUser, FiEdit, FiTrash, FiPlusCircle, FiUsers, FiBook, FiHash, FiPrinter, FiDownload, FiHelpCircle } from "react-icons/fi";
import { MainContext } from "@/context/context";
import { appName } from "@/utils/utils";
import { FaFileImport } from "react-icons/fa";
import { TbFileImport } from "react-icons/tb";
import TableComponent from '@/utils/TableComponent';

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
  const data = [
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Peter Jones', age: 40, city: 'Paris', place: 'something' },
    { name: 'John Doe', age: 30, city: 'New York', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Jane Doe', age: 25, city: 'London', place: 'something' },
    { name: 'Rohith', age: 40, city: 'Paris', place: 'something' },

  ];
  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">
        <div className="flex justify-start flex-wrap p-2">
          <div>
            <label htmlFor="newstudent_modal" className="btn btn-secondary" onClick={() => setNewStudentRollNo(students.length + 1)}>+ New Class</label>
          </div>
          
        </div>
        <div>
          <TableComponent data={data} />
        </div>
        <input type="checkbox" id="newstudent_modal" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box">
                  {/* <h3 className="flex items-center font-bold text-lg"><FiPlusCircle className="mr-1" /> Edit Evaluator</h3>
                  <p className="flex items-center py-4"><FiType className='mr-2' />Title</p>
                  <input className="input input-bordered w-full" placeholder="What's the name of the exam / evaluator?" type="text" onChange={(x) => setEditEvaluatorTitle(x.target.value)} value={editEvaluatorTitle} />
                  <p className="flex items-center py-4"><FiUsers className='mr-2' />Class</p> */}
                  {/* <select className="select select-bordered w-full" value={editEvaluatorClassId} onChange={(x) => setEditEvaluatorClassId(x.target.value)}>
                    <option disabled value={"-1"}>Select class</option>
                    {
                      classes?.map((class_: any, i: any) => (
                        <option key={i} value={class_._id}>{class_?.subject} | {class_?.name} {class_?.section}</option>
                      ))
                    }
                  </select> */}
                  <div className="modal-action">
                    <label htmlFor="newstudent_modal" className="btn">Cancel</label>
                    {/* <label htmlFor="editevaluator_modal" className="btn btn-primary" onClick={() => editEvaluator()}>Save</label> */}
                  </div>
                </div>
                <label className="modal-backdrop" htmlFor="newstudent_modal">Cancel</label>
              </div>
      </div>
    </>
  );
}
