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

export default function Class() {


  const [rowData, setRowData] = useState();
  const modelId = "teacher";
  const {
    teachers,getTeachers,deleteTeacher,
  
} = useContext(MainContext);

  const inputCreateRef = useRef(null);
  const inputEditRef = useRef(null);
  const inputDeleteRef = useRef(null);
  useEffect(() => {
    getTeachers();
  }, []);


  const handleDeleteTeacher = () => {
    if (inputDeleteRef.current) {
      inputDeleteRef.current.click();
    }

    deleteTeacher(rowData._id);
  };

  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">

        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2"  >
          <Typography variant="h5" component="h2" gutterBottom>
            Class
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/admin/teacher">Teacher</Link>

          </Breadcrumbs>
          <div className="flex justify-start gap-4 flex-wrap p-2">
            <div>
              <Link href="/admin/teacher/create" className="btn btn-secondary" >+ Create Teacher</Link>
            </div>
          </div>
        </Box>
        <TableComponent visibleColumns={['name', 'email','class','section','subject']} data={teachers} editable={true} deletable={true} action={setRowData} modelName={modelId} />

        <input type="checkbox" id={`delete${modelId}_modal`} ref={inputDeleteRef} className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Delete Subject
              </Typography>
              <Typography variant="h5" component="h2" className="text-red-800 mb-4">
                Please Confirm to Teacher - {rowData?.name} Delete ?
              </Typography>
            </Box>
            <div className="modal-action">
              <label htmlFor={`delete${modelId}_modal`} className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteTeacher}
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
