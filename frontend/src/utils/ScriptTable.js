import React, {useContext, useState, useEffect } from "react";
import { MainContext } from "@/context/context";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Menu,
  MenuItem,
  Stack,Typography,
} from "@mui/material";

// import {Upload} from '@mui/icons-material/';
import { UploadButton } from "@/utils/uploadthing";

export default function ScriptTable({
  students, // Passed data from parent
  visibleColumns,
  editable,
  action,
  setStudents, // To update students state from parent
}) {
  const [filteredData, setFilteredData] = useState(students);
  const [filter, setFilter] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    convertPDFToImage
  } = useContext(MainContext);
  // Update local state when `students` prop changes
  useEffect(() => {
    setFilteredData(students);
  }, [students]);

  // Filter Logic
  const filterData = (value) => {
    const updatedData =
      value === "uploaded"
        ? students.filter((student) => student.uploaded)
        : value === "not_uploaded"
          ? students.filter((student) => !student.uploaded)
          : students;
    setFilteredData(updatedData);
  };

  // Handle filter menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (value) => {
    setAnchorEl(null);
    if (value) {
      setFilter(value);
      filterData(value);
    }
  };

  // Toggle attendance for a student
  const toggleAttendance = (studentId) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId
        ? { ...student, isAbsent: !student.isAbsent }
        : student
    );
    setStudents(updatedStudents);
  };

  // Handle upload action
  const handleUpload = (studentId, urls) => {
    const updatedStudents = students.map((student) =>
      // console.log(urls);
      student.id === studentId
        ? {
          ...student,
          uploaded: true,
          answerScript: urls,
        }
        : student
    );
    setStudents(updatedStudents);
  };
  
  // Handle removal of a specific file
  const removeUpload = (studentId, fileUrl) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId
        ? {
          ...student,
          answerScript: [],
          uploaded: student.answerScript.length > 1, // Update uploaded status
        }
        : student
    );
    setStudents(updatedStudents);
  };

  return (
    <div>
      {/* Filter Dropdown */}
      <Button variant="outlined" onClick={handleMenuOpen}>
        Filter by Upload:{" "}
        {filter === "all" ? "All" : filter === "uploaded" ? "Uploaded" : "Not Uploaded"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose(null)}
      >
        <MenuItem onClick={() => handleMenuClose("all")}>All</MenuItem>
        <MenuItem onClick={() => handleMenuClose("uploaded")}>Uploaded</MenuItem>
        <MenuItem onClick={() => handleMenuClose("not_uploaded")}>
          Not Uploaded
        </MenuItem>
      </Menu>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
              {editable && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((student, index) => (
              <TableRow key={student.id || index}>
                {visibleColumns.map((col) => (
                  <TableCell key={col}>
                    {col === "attendance" ? (
                      <Checkbox
                        checked={!student.isAbsent}
                        onChange={() => toggleAttendance(student.id)}
                      />
                    ) : col === "uploaded" ? (
                      <>
                        {!student.isAbsent && (
                          <Stack direction="column" spacing={2}>
                            {student.uploaded ? (
                              // Display Uploaded State
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="body1" style={{ color: "green", fontWeight: "bold" }}>
                                  Uploaded
                                </Typography>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  onClick={() => removeUpload(student.id)}
                                  // startIcon={<Upload />}
                                >
                                  Remove
                                </Button>
                              </Stack>
                            ) : (
                              // Display Upload Button
                              <UploadButton
                                endpoint="media"
                                onBeforeUploadBegin={async (files) => {
                                  const pdfFiles = files.filter(
                                    (file) => file.type === "application/pdf"
                                  );
                                  const otherFiles = files.filter(
                                    (file) => file.type !== "application/pdf"
                                  );
                
                                  // Convert PDFs to images
                                  if (pdfFiles.length > 0) {
                                    for (const pdf of pdfFiles) {
                                      const images = await convertPDFToImage(pdf);
                                      otherFiles.push(...images);
                                    }
                                  }
                                  return otherFiles; // Only images are passed for upload
                                }}
                                onClientUploadComplete={(res) => {
                                  if (res.length > 0) {
                                    const uploadedFileUrls = res.map((file) => file.url); // Get all uploaded file URLs
                                    handleUpload(student.id, uploadedFileUrls); // Pass the array of file URLs to the handler
                                  }
                                }}
                                onUploadError={(error) => {
                                  alert(`Upload failed: ${error.message}`);
                                }}
                              />
                            )}
                          </Stack>
                        )}

                      </>
                    ) : (
                      student[col]
                    )}
                  </TableCell>
                ))}
                {editable && (
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => action(student.id)}
                    >
                      Action
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
