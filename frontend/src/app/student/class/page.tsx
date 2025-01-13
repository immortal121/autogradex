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
  const modelId = "Class";
  const {
    classes,
    setClasses,
    subjects,
    getSubjects,
    getClasses,
    classSelected,
    setClassSelected,
    ClassName,
    setClassName,
    ClassDescription,
    setClassDescription,
    editClassName, setEditClassName, editClassDescription, setEditClassDescription,
    createClass, deleteClass, editClass,
  } = useContext(MainContext);

  const inputCreateRef = useRef(null);
  const inputEditRef = useRef(null);
  const inputDeleteRef = useRef(null);
  useEffect(() => {
    getClasses();
  }, []);



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
            <Link underline="hover" color="inherit" href="/admin/Class">Class</Link>

          </Breadcrumbs>
          {/* <div className="flex justify-start gap-4 flex-wrap p-2">
            <div>
              <Link href="/admin/class/create" className="btn btn-secondary" >+ Create Class</Link>
            </div>
            <div>
              <Link href="#" className="btn btn-secondary" > Edit Class</Link>
            </div>
          </div> */}
        </Box>
        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2"  >
          <Typography variant="h4" component="h2" gutterBottom>
            Student Can get Class , Resources share by Teachers
          </Typography>
        </Box>

        </div>
    </>
  );
}
