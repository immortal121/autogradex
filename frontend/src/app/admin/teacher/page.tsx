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
  const [rowData,setRowData] = useState(0);
  const data = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York', place: 'something' },

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
          <TableComponent data={data} editable={true} action={setRowData} deletable={true} modelName={student} />
        </div>
        <input type="checkbox" id="newstudent_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">

            <div className="modal-action">
              <label htmlFor="newstudent_modal" className="btn">Cancel</label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="newstudent_modal">Cancel</label>
        </div>


        <input type="checkbox" id="deletestudent_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h1>Delete : {rowData.id}</h1>
            <div className="modal-action">
              <label htmlFor="deletestudent_modal" className="btn">Cancel</label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="newstudent_modal">Cancel</label>
        </div>
        <input type="checkbox" id="editstudent_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h1>Edit : {rowData.id}</h1>
            <div className="modal-action">
              <label htmlFor="editstudent_modal" className="btn">Cancel</label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="newstudent_modal">Cancel</label>
        </div>
      </div>
    </>
  );
}
