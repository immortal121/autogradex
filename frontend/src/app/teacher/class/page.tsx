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
    classes,getFilteredClasses,
  } = useContext(MainContext);

  const inputCreateRef = useRef(null);
  const inputEditRef = useRef(null);
  const inputDeleteRef = useRef(null);
  useEffect(() => {
    getFilteredClasses();
  }, []);



  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">

        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2"  >
          <Typography variant="h5" component="h2" gutterBottom>
            Class
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/teacher">
              Teacher
            </Link>
            <Link underline="hover" color="inherit" href="/teacher/classes">Class</Link>

          </Breadcrumbs>
        </Box>
        <TableComponent visibleColumns={['name', 'sections','subjects','studentCount']} data={classes}/>

        </div>
    </>
  );
}
