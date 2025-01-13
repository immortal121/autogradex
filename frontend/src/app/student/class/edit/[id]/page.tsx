"use client";
import { useContext, useState, useEffect, useRef } from "react";
import { MainContext } from "@/context/context";
import TableComponent from '@/utils/TableComponent';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation'
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
  const param = useParams()

  // const { id } = router.query; 

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


  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">

        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2"  >
          <Typography variant="h5" component="h2" gutterBottom>
            Hello {param.id}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/admin/Class">
              Class
            </Link>
            
          </Breadcrumbs>
        </Box>

      </div>
    </>
  );
}