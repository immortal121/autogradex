"use client";
import { useContext, useState, useEffect, useRef } from "react";
import { MainContext } from "@/context/context";
import TableComponent from '@/utils/TableComponent';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button, Breadcrumbs
} from '@mui/material';

export default function Subject() {


  const [rowData, setRowData] = useState();
  const modelId = "Subject";
  const {    
    subjects,
    setSubjects,
    getSubjects,
    subjectSelected,
    setSubjectSelected,
    subjectName,
    setSubjectName,
    subjectDescription,
    setSubjectDescription,
    editSubjectName,setEditSubjectName,editSubjectDescription,setEditSubjectDescription,
    createSubject,deleteSubject,editSubject,
  } = useContext(MainContext);

  const inputCreateRef = useRef(null);
  const inputEditRef = useRef(null);
  const inputDeleteRef = useRef(null);

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    if (rowData) {
      setSubjectSelected(rowData._id);
      setEditSubjectName(rowData.name);
      setEditSubjectDescription(rowData.description);
    }
  }, [rowData]);

  const handleCreateSubject = () => {

    if (!subjectName || !subjectDescription) {
      toast.error("fill all the fields");
      return;
    }
    if (inputCreateRef.current) {
      inputCreateRef.current.click();
    }
    createSubject();

  };

  const handleEditSubject = () => {
    if (!editSubjectName || !editSubjectDescription) {
      toast.error("ffill all the fields");
      return;
    }
    if (inputEditRef.current) {
      inputEditRef.current.click();
    }
    editSubject();
  };

  const handleDeleteSubject = () => {
    if (inputDeleteRef.current) {
      inputDeleteRef.current.click();
    }

    deleteSubject();
  };

  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">

        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2"  >
          <Typography variant="h5" component="h2" gutterBottom>
            Subject
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/admin/subject">subject</Link>
          </Breadcrumbs>
          <div className="flex justify-start flex-wrap p-2">
            <div>
              <label htmlFor="newclass_modal" className="btn btn-secondary" >+ New Subject</label>
            </div>
          </div></Box>
        <div>
          <TableComponent visibleColumns={['name', 'description']} data={subjects} editable={true} deletable={true} action={setRowData} modelName={'Subject'} />
        </div>
        <input type="checkbox" id="newclass_modal" ref={inputCreateRef} className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Create New Subject
              </Typography>
              <TextField
                fullWidth
                label="Subject Name"
                variant="standard"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="mb-4"
              />
              <TextField
                fullWidth
                label="Subject Description"
                multiline
                rows={2}
                variant="standard"
                value={subjectDescription}
                onChange={(e) => setSubjectDescription(e.target.value)}
                className="mb-4"
              />
            </Box>
            <div className="modal-action">
              <label htmlFor="newclass_modal" className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateSubject}
                className="mt-4"
              >
                Create Subject
              </Button>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="newclass_modal">Cancel</label>
        </div>

        <input type="checkbox" id={`edit${modelId}_modal`} ref={inputEditRef} className="modal-toggle" />
        <div className="modal" role="dialog">

          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Edit Subject
              </Typography>
              <TextField
                fullWidth
                variant="standard"

                placeholder="Subject Name"
                value={editSubjectName}
                className="mb-4"
                onChange={(e) => setEditSubjectName(e.target.value)}
              />
              <TextField
                fullWidth
                variant="standard"
                placeholder="Subject Description"
                value={editSubjectDescription}
                className="mb-4"
                onChange={(e) => setEditSubjectDescription(e.target.value)}
              />

            </Box>
            <div className="modal-action">
              <label htmlFor={`edit${modelId}_modal`} className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditSubject}
                className="mt-4"
              >
                Edit Subject
              </Button>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor={`edit${modelId}_modal`}>Cancel</label>
        </div>

        <input type="checkbox" id={`delete${modelId}_modal`} ref={inputDeleteRef} className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Delete Subject
              </Typography>
              <Typography variant="h5" component="h2" className="text-red-800 mb-4">
                Please Confirm to Subject - {rowData?.name} Delete ?
              </Typography>
            </Box>
            <div className="modal-action">
              <label htmlFor={`delete${modelId}_modal`} className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteSubject}
                className="mt-4"
              >Confirm
              </Button>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor={`delete${modelId}_modal`}>Cancel</label>
        </div>
      </div>
    </>
  );
}
