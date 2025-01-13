"use client";
import { useContext, useState, useEffect } from "react";
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

export default function StudentAssignmentList() {
  const { assignments, getFilteredAssignments } = useContext(MainContext);
  const [studentAssignments, setStudentAssignments] = useState([]);
  const columns = ["name", "subject", "class", "section", "progress", "actions"];

  useEffect(() => {
    // Fetch and filter assignments for the student
    getFilteredAssignments();
    // Assuming "assignments" is fetched and contains all assignments,
    // you can filter it based on student-specific criteria here.
    // For now, we'll assume the data is directly usable.
    setStudentAssignments(assignments);
  }, [assignments]);

  const handleViewAssignment = (assignmentId) => {
    // Navigate to the assignment detail page
    window.location.href = `/student/assignments/${assignmentId}`;
  };

  const handleRequestExtension = (assignmentId) => {
    // Placeholder function for requesting an extension
    toast.info(`Extension request sent for assignment ${assignmentId}`);
  };

  const renderActions = (assignmentId) => (
    <div className="flex gap-2">
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleViewAssignment(assignmentId)}
      >
        View
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleRequestExtension(assignmentId)}
      >
        Request Extension
      </Button>
    </div>
  );

  // const transformedData = studentAssignments.map((assignment) => ({
  //   ...assignment,
  //   actions: renderActions(assignment.id), // Add action buttons for each assignment
  // }));

  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">
        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2">
          <Typography variant="h5" component="h2" gutterBottom>
            My Assignments
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/student">
              Student
            </Link>
            <Link underline="hover" color="inherit" href="/student/assignments">
              Assignments
            </Link>
          </Breadcrumbs>
        </Box>
        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2"  >
          <Typography variant="h4" component="h2" gutterBottom>
          Students can view a list of assignments they have submitted and download their respective mark sheets directly from this page.
          </Typography>
        </Box>

        {/* <AssignmentTable
          data={transformedData}
          editable={false}
          deletable={false}
          visibleColumns={columns}
        /> */}
      </div>
    </>
  );
}
