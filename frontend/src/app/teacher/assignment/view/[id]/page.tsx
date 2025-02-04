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
  const [reget, setReget] = useState(false);
  const {
    assignments,
    getFilteredAssignment,
    updateAssignmentStudents, Evaluate, EvaluateWithDigital,EvaluateWithDigitalStudent
  } = useContext(MainContext);

  const handlePrint = (student) => {
    if (!student) {
      console.error("No student data provided for printing.");
      return;
    }
  
    const { name, email, marksScored, comments, marksBreakdown } = student;
  
    // Create a new print window
    const printWindow = window.open("", "_blank");
  
    if (!printWindow) {
      console.error("Failed to open a new window for printing.");
      return;
    }
  
    // Generate the HTML content for the print view
    const printContent = `
      <html>
        <head>
          <title>Marks Sheet</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>Marks Sheet</h1>
          <p><strong>Student Name:</strong> ${name || "N/A"}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>
          <p><strong>Marks Scored:</strong> ${marksScored !== undefined ? marksScored : "Not Evaluated"}</p>
          <p><strong>Comments:</strong> ${comment || "No Comments"}</p>
           ${marksBreakdown && marksBreakdown.length > 0 ? `
          <h2>Marks Breakdown</h2>
          ${marksBreakdown.map((breakdown, pageIndex) => `
            <h3>Page ${pageIndex + 1}: ${breakdown.page || "N/A"}</h3>
            ${breakdown.labels?.length > 0 ? `
              <table>
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Question No</th>
                    <th>Label Name</th>
                    <th>Marks Given</th>
                    <th>X Coordinate</th>
                    <th>Y Coordinate</th>
                  </tr>
                </thead>
                <tbody>
                  ${breakdown.labels.map(label => `
                    <tr>
                      <td>${label.sectionName || "N/A"}</td>
                      <td>${label.questionNo || "N/A"}</td>
                      <td>${label.labelName || "N/A"}</td>
                      <td>${label.marksGiven || 0}</td>
                      <td>${label.x || 0}</td>
                      <td>${label.y || 0}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            ` : `<p>No labels available for this page.</p>`}

            ${breakdown.comments?.length > 0 ? `
              <h4>Comments</h4>
              <ul>
                ${breakdown.comments.map(comment => `
                  <li>
                    <strong>Section:</strong> ${comment.sectionName || "N/A"} | 
                    <strong>Question No:</strong> ${comment.questionNo || "N/A"} | 
                    <strong>Comment:</strong> ${comment.comment || "N/A"}
                  </li>
                `).join("")}
              </ul>
            ` : `<p>No comments available for this page.</p>`}
          `).join("")}
        ` : `<p>No marks breakdown available.</p>`}
          </body>
      </html>
    `;
  
    // Write the content into the new window and trigger the print
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
  
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
            comments: item.comments || null,
            evaluationStatus: item.evaluationStatus || "Pending",
          }))
        );
      }
    };
    fetchData();
  }, [reget]);

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
    setReget(!reget);
  };

  const handleEvaluateWithAI = () => {

    toast.success("Evaluation with AI started!");
    Evaluate(id);
    setReget(!reget);
  };

  const handleEvaluateWithDigital = () => {
    toast.success("Evaluation with DigiEvaluator started!");
    EvaluateWithDigital(id);
  };

  
  const handleEvaluateWithDigitalStudent = (studentid) => {
    toast.success("Opening DigitalEvaluator!");
    EvaluateWithDigitalStudent(id,studentid);
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
                <TableCell>{student.comment ? student.comment : "No Comments"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handlePrint(student)}
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

            <Typography><strong>Total Marks:</strong> {assignments.MaxMarks}</Typography>
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      {student.evaluationStatus}
                    </TableCell>
                    <TableCell>
                      {student.evaluationStatus === "Evaluated" ? (
                        <>
                          <Button
                            variant="outlined"
                            color="primary"
                            
                            onClick={()=>handleEvaluateWithDigitalStudent(student.id)}
                            className="m-2"
                          >
                            Edit with Digitevaluator
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            className="m-2"
                            onClick={() =>
                              console.log(`Edit with EvaluateAI for ${student.name}`)
                            }
                          >
                            Edit with EvaluateAI
                          </Button>
                        </>
                      ) : (
                        <>
                        
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={()=>handleEvaluateWithDigitalStudent(student.id)}
                            className="mr-2"
                          >
                            Evalute with Digitevaluator
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
            disabled={!(assignments?.status === "Evaluation Not Started" || assignments?.status === "Evaluation In Progress")}

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
