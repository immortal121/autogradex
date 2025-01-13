"use client";
import { useContext, useState, useEffect, useRef } from "react";
import { MainContext } from "@/context/context";
import AssignmentTable from '@/utils/AssignmentTable';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  Breadcrumbs,
  Button
} from '@mui/material';

export default function AssignmentList() {
  const [rowData, setRowData] = useState();
  const modelId = "Assignment";

  const { assignments, getFilteredAssignments } = useContext(MainContext);

  useEffect(() => {
    getFilteredAssignments();// Fetch the list of assignments
  
  }, []);
  const handleViewAssignment = (assignmentId) => {
    // Navigate to the assignment detail page
    window.location.href = `/teacher/assignments/${assignmentId}`;
  };
  // const columns = [
  //   {key: "name", label: "Assignment Name", sortable: true },
  //   {key: "subject", label: "Subject", sortable: true },
  //   {key: "className", label: "Class", sortable: true },
  //   {key: "section", label: "Section", sortable: false },
  //   {key: "totalStudents", label: "Total Students", sortable: false },
  //   {key: "evaluationProgress", label: "Evaluation Progress", sortable: false },
  //   ];
    const columns = ["name","subject","class","section","progress"];
    
  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">

        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2">
          <Typography variant="h5" component="h2" gutterBottom>
            Assignments
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/teacher">
              Teacher
            </Link>
            <Link underline="hover" color="inherit" href="/teacher/assignments">Assignments</Link>
          </Breadcrumbs>
          {/* <div className="flex justify-start gap-4 flex-wrap p-2">
            <div>
              <Link href="/teacher/assignment/create" className="btn btn-secondary" >+ Create Assignment</Link>
            </div>
          </div> */}
        </Box>
        
        <AssignmentTable
          data={assignments}
          editable={false}
          deletable={false}
          visibleColumns={columns}
        />
      </div>
    </>
  );
}
