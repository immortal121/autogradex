"use client";
import { useContext, useState, useEffect } from "react";
import { MainContext } from "@/context/context";
import ScriptTable from "@/utils/ScriptTable";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Image from "next/image";

export default function AssignmentView() {
  const { id } = useParams(); // Assignment ID from the URL
  const [students, setStudents] = useState([]);
  const {
    assignments,
    getFilteredAssignment,
    updateAssignmentStudents,Evaluate
  } = useContext(MainContext);

  // Fetch assignment details and students on page load
  useEffect(() => {
    const fetchData = async () => {
      const assignmentData = await getFilteredAssignment(id);
      if (assignmentData) {
        setStudents(
          assignmentData?.students.map((item, index) => ({
            sno: index + 1,
            id: item.id || item.studentId,
            name: item.name || "Unknown",
            isAbsent: item.isAbsent || false,
            uploaded: item.uploaded || false,
            answerScript: item.answerScript || [],
            marksScored: item.marksScored || null,
            comments:item.comments||null,
            evaluationStatus: item.evaluationStatus || "Pending",
          }))
        );
      }
    };
    fetchData();
  }, [id,students]);

  // Function to handle updating the assignment table
  const handleStudentsUpdate = (updatedStudents) => {
    console.log(updatedStudents);
    setStudents(updatedStudents);

    // Propagate changes to the assignment table
    updateAssignmentStudents(id, updatedStudents)
      .then(() => {
        toast.success("Assignment updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating assignment:", error);
        toast.error("Failed to update assignment.");
      });
  };

  const handleEvaluateWithAI = () => {
    
    toast.success("Evaluation with AI started!");
    Evaluate(id);
  };

  const handleEvaluateWithDigital = () => {
    toast.success("Evaluation with DigiEvaluator started!");
  };

  // Function to render evaluation results or marks list
  const renderMarksTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Marks Scored</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.marksScored ? student.marksScored : "Not Evaluated"}</TableCell>
                <TableCell>{student.comments ? student.comments : "No Comments"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => console.log(`View marks for ${student.name}`)}
                  >
                    View Marks
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const visibleColumns = ["sno", "name", "attendance", "uploaded"]; // Define visible columns

  return (
    <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">
      {/* Assignment Details */}
      <Box className="bg-white flex flex-col gap-4 p-4 mb-4 rounded-md shadow-md">
        <Typography variant="h5" component="h2">
          Assignment Details
        </Typography>
        {assignments ? (
          <>
            <Typography><strong>Title:</strong> {assignments.name}</Typography>
            <Typography><strong>Subject:</strong> {assignments.subject}</Typography>
            <Typography><strong>Class:</strong> {assignments.class}</Typography>
            <Typography><strong>Section:</strong> {assignments.section}</Typography>
            <Typography><strong>Progress:</strong> {assignments.progress}</Typography>
            <Typography><strong>Status:</strong> {assignments.status}</Typography>
            {assignments.questionPaper && (
              <Typography>
                <strong>Question Papers:</strong>
                <FilePreview links={assignments.questionPaper} />
              </Typography>
            )}
            {assignments.keyAnswerScript && (
              <Typography>
                <strong>Answer Script:</strong>
                <FilePreview links={assignments.keyAnswerScript} />
              </Typography>
            )}
          </>
        ) : (
          <Typography>Loading assignment details...</Typography>
        )}
      </Box>

      {/* Conditional Rendering of Content Based on Status */}
      {assignments?.status === "Pending Upload" || assignments?.status === "Evaluation Not Started" ? (
        // Show the Script Table for Pending Upload or Evaluation Not Started
        <Box className="bg-white flex flex-col gap-4 p-4 mb-4 rounded-md shadow-md">
          <Typography variant="h6" component="h3">
            Students
          </Typography>
          <ScriptTable
            students={students}
            visibleColumns={visibleColumns}
            setStudents={handleStudentsUpdate} // Pass handler to propagate changes
          />
        </Box>
      ) : assignments?.status === "Evaluation In Progress" ? (
        // Show message for Evaluation In Progress
        <Box className="bg-white flex flex-col gap-4 p-4 mb-4 rounded-md shadow-md">
          <Typography variant="h6" component="h3">
            Evaluation In Progress
          </Typography>
          <Typography>The evaluation of this assignment is currently in progress.</Typography>
          
          <Typography><strong>Progress:</strong> {assignments.progress}</Typography>
        </Box>
      ) : assignments?.status === "Completed" ? (
        // Show Marks List for Completed
        <Box className="bg-white flex flex-col gap-4 p-4 mb-4 rounded-md shadow-md">
          <Typography variant="h6" component="h3">
            Marks List
          </Typography>
          {renderMarksTable()}
        </Box>
      ) : null}

      {/* Evaluation Options */}
      <Box className="bg-white flex flex-col gap-4 p-4 rounded-md shadow-md">
        <Typography variant="h6" component="h3">
          Evaluation Options
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEvaluateWithAI}
            disabled={assignments?.status !== "Evaluation Not Started"}
          >
            Evaluate with AI
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEvaluateWithDigital}
            disabled={assignments?.status !== "Evaluation Not Started"}
          >
            Evaluate with DigiEvaluator
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

const FilePreview = ({ links }) => (
  <div className="flex flex-wrap mt-2">
    {links.map((link, index) => (
      <Image
        key={index}
        src={link}
        width="20"
        height="20"
        alt="Preview"
        className="w-20 h-20 object-cover rounded-md cursor-pointer"
        onClick={() => window.open(link, "_blank")}
      />
    ))}
  </div>
);
