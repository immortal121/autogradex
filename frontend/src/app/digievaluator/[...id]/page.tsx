"use client";
import React, { useState, useEffect, useContext, useCallback, useRef } from "react";

import { useParams,useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import DoneIcon from '@mui/icons-material/Done';
import Logo from "../../../../public/autograde.jpeg";
import ClearIcon from '@mui/icons-material/Clear';


import { MainContext } from "@/context/context";


export default function Home() {


  const { id } = useParams();

  //
  const router = useRouter();

  const [lmenu, setLmenu] = useState(false); // Controls left bar visibility on small screens
  const [rmenu, setRmenu] = useState(false); // Placeholder for right bar toggle

  // data variables
  // context
  const { getFilteredAssignment, getAssignmentStudentById, UpdateScoresByDigitalEvaluator } = useContext(MainContext);

  // student

  const [studentId, setStudentId] = useState(id[1]?id[1]:'');
  const [student, setStudent] = useState({});


  const [lstudent, setLstudent] = useState({});
  // assignments
  const [assignment, setAssignment] = useState({});


  // marking

  const [selectedQuestion, setSelectedQuestion] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const [selectedLabel, setSelectedLabel] = useState();
  const [hoveredMark, setHoveredMark] = useState();
  const imageRef = useRef();
  const marksLabels = [
    0.5,
    ...Array.from({ length: 11 }, (_, i) => i), // "0" to "10"
  ];
  const [page, setPage] = useState('');

  // history
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(1);

  // update
  const handleSave = () => {
    UpdateScoresByDigitalEvaluator(id[0], student);
  }

  // methods

  useEffect(() => {
    const fetchData = async () => {
      const assignmentData = await getFilteredAssignment(id[0]);
      setAssignment(assignmentData);
    };
    fetchData();
  }, [id[0]]);

  useEffect(() => {
    const fetchData = async () => {
      if (studentId) {
        const assignmentData = await getAssignmentStudentById(id, studentId);
        setStudent(assignmentData);
      }
    };
    fetchData();
  }, [studentId]);


  // Table
  const calculateTotalMarks = (sectionName, questionNo) => {
    if (!student) return 0;

    let total = 0;
    student?.marksBreakdown?.forEach((breakdown) => {
      breakdown.labels.forEach((label) => {
        if (label.sectionName === sectionName && label.questionNo === questionNo) {
          total += label.marksGiven;
        }
      });
    });

    return total;
  };
  const handleScoreChange = (sectionName, questionNo, value) => {
    if (!student) return;

    // Get the selected question's maximum marks from the assignment structure
    const questionMaxMarks = assignment.assignmentStructure
      .flatMap(section => section.questions
        .filter(question => section.sectionName === sectionName && question.questionNo === questionNo)
      )
      .map(question => question.marks)[0];

    if (parseFloat(value) > questionMaxMarks) {
      alert(`The entered value (${value}) exceeds the maximum score (${questionMaxMarks}) for this question.`);
      return;
    }

    let labelExists = false;

    // Create a deep copy of the student's marksBreakdown
    const updatedMarksBreakdown = student.marksBreakdown.map((breakdown) => {
      // Create a deep copy of the labels array
      const updatedLabels = breakdown.labels.map((label) => {
        if (label.sectionName === sectionName && label.questionNo === questionNo) {
          labelExists = true;
          // Return a new object with the updated marksGiven value
          return { ...label, marksGiven: parseFloat(value) };
        }
        return label;
      });

      // If the label doesn't exist, add it
      if (!labelExists) {
        updatedLabels.push({
          sectionName,
          questionNo,
          labelName: 'No Label', // Default label name or update as needed
          marksGiven: parseFloat(value),
          x: 0, // Default x-coordinate
          y: 0, // Default y-coordinate
        });
      }

      return { ...breakdown, labels: updatedLabels };
    });

    // Update the student state immutably
    setStudent({ ...student, marksBreakdown: updatedMarksBreakdown });
    UpdateScoresByDigitalEvaluator(id[0], student);
  };

  // Image 
  const handleImageClick = (e) => {
    if (!selectedQuestion) {
      alert("Please select a question first before marking.");
      return;
    }

    if (!selectedLabel) {
      alert("Please select a Mark / Label first before marking.");
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Get the selected question's maximum marks from the assignment structure
    const questionMaxMarks = assignment.assignmentStructure
      .flatMap(section => section.questions
        .filter(question => section.sectionName === selectedSection && question.questionNo === selectedQuestion)
      )
      .map(question => question.marks)[0];

    if (!questionMaxMarks) {
      alert("Unable to find the maximum marks for the selected question.");
      return;
    }

    // Calculate the existing total marks for the selected section and question
    const existingMarks = student.marksBreakdown
      .filter(breakdown => breakdown.page === page)
      .flatMap(breakdown => breakdown.labels)
      .filter(label => label.sectionName === selectedSection && label.questionNo === selectedQuestion)
      .reduce((total, label) => total + label.marksGiven, 0);

    const newLabelMarks = selectedLabel === "correct" || selectedLabel === "wrong" ? 0 : parseFloat(selectedLabel);

    const marksGiven = parseFloat(existingMarks) + newLabelMarks;
    if (marksGiven > questionMaxMarks) {
      alert(`The entered value (${marksGiven}) exceeds the maximum score (${questionMaxMarks}) for this question.`);
      return;
    }

    const newLabel = {
      sectionName: selectedSection,
      questionNo: selectedQuestion,
      labelName: selectedLabel,
      marksGiven: newLabelMarks,
      x: x.toFixed(2),
      y: y.toFixed(2),
    };

    // Create a deep copy of the student's marksBreakdown
    const updatedMarksBreakdown = student.marksBreakdown.map((breakdown) => {
      if (breakdown.page === page) {
        // Check if the label already exists
        const labelExists = breakdown.labels.some((label) =>
          label.sectionName === selectedSection &&
          label.questionNo === selectedQuestion &&
          label.labelName === selectedLabel
        );

        if (!labelExists) {
          return {
            ...breakdown,
            labels: [...breakdown.labels, newLabel],
          };
        }

        return breakdown;
      }

      return breakdown;
    });

    // If the page does not exist, add it with the new label
    const pageExists = updatedMarksBreakdown.some((breakdown) => breakdown.page === page);
    if (!pageExists) {
      updatedMarksBreakdown.push({
        page,
        labels: [newLabel],
        comments: [],
      });
    }

    setStudent({ ...student, marksBreakdown: updatedMarksBreakdown });
    setSelectedLabel(null);
  };


  const handleMarkRemove = (e, breakdownIndex, labelIndex) => {
    e.stopPropagation();

    const updatedMarksBreakdown = student.marksBreakdown.map((breakdown, index) => {
      if (index === breakdownIndex) {
        const updatedLabels = breakdown.labels.filter((_, i) => i !== labelIndex);
        return { ...breakdown, labels: updatedLabels };
      }
      return breakdown;
    });

    setStudent({ ...student, marksBreakdown: updatedMarksBreakdown });
  };


  const handleCommentChange = (sectionName, questionNo, comment) => {
    const updatedMarksBreakdown = student.marksBreakdown.map((breakdown) => {
      if (breakdown.page === page) {
        const existingCommentIndex = breakdown.comments.findIndex(
          (cmt) => cmt.sectionName === sectionName && cmt.questionNo === questionNo
        );

        let updatedComments;
        if (existingCommentIndex !== -1) {
          // Update the existing comment
          updatedComments = breakdown.comments.map((cmt, index) => {
            if (index === existingCommentIndex) {
              return { ...cmt, comment };
            }
            return cmt;
          });
        } else {
          // Add a new comment if it doesn't exist
          updatedComments = [
            ...breakdown.comments,
            { sectionName, questionNo, comment },
          ];
        }

        return { ...breakdown, comments: updatedComments };
      }
      return breakdown;
    });

    setStudent({ ...student, marksBreakdown: updatedMarksBreakdown });
  };

  const handleOverallCommentChange = (overallComment) => {
    setStudent({ ...student, comment: overallComment });
  };

  const handleStatus = (e) => {
    setStudent({ ...student, evaluationStatus: e.target.value });
  };

  return (
    <main className="flex bg-base-100 h-screen w-screen overflow-hidden m-0">
      {/* Left Bar */}
      <div className={`bg-white flex flex-col p-4 h-full overflow-auto rounded-md shadow-md lg:w-[20vw] ${lmenu
        ? "absolute max-lg:z-[1200] max-lg:w-[80vw] max-lg:h-full"
        : "max-lg:hidden"
        }`}>
        <div className="flex justify-between items-center  mb-4">
          <Link href="/">
            <Image src={Logo} height={50} alt="AutogradeX" />
          </Link>
          <IconButton
            size="large"
            edge="start"
            onClick={() => setLmenu(false)}

            sx={{ display: { lg: "none" } }}
            className="lg:hidden"
          >
            <CloseIcon />
          </IconButton>
        </div>
        {/* Tools Section */}
        <div className="mb-6">
          <Typography variant="subtitle1" className="mb-2">
            Tools
          </Typography>
          <div className="flex flex-wrap gap-2">

            {/* <Tooltip title="Redo">
              <Button
                variant={"contained"}
                onClick={redo}
              >
                <RedoIcon />
              </Button></Tooltip>

            <Tooltip title="Undo">
              <Button
                variant={"contained"}
                onClick={undo}
              >
                <UndoIcon />
              </Button></Tooltip>*/}
            <Tooltip title="Right">
              <Button

                key={"correct"}
                variant={selectedLabel === "correct" ? "contained" : "outlined"}
                onClick={() => setSelectedLabel("correct")}
                color="success"
              >
                <DoneIcon />
              </Button></Tooltip>
            <Tooltip title="Wrong">
              <Button
                key={"wrong"}
                variant={selectedLabel === "wrong" ? "contained" : "outlined"}
                onClick={() => setSelectedLabel("wrong")}
                color="error"
              >
                <ClearIcon />
              </Button></Tooltip>

          </div>
        </div>
        {/* Marks Section */}
        <div>
          <Typography variant="subtitle1" className="mb-4">
            Marks
          </Typography>
          <div className="flex flex-wrap gap-1">
            {marksLabels.map((label) => (
              <Button
                key={label}
                variant={selectedLabel === label ? "contained" : "outlined"}
                color="success"
                onClick={() => setSelectedLabel(label)}
                className={`${selectedLabel === label ? "bg-green-500 text-white" : ""
                  }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Typography variant="subtitle1" className="mb-4">
            Saving Options
          </Typography>
          <div className="flex flex-wrap gap-1">
              <Button
                variant={"contained"}
                color="success"
                onClick={() => handleSave()}
                
              >
                Save
              </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full h-full">
        {/* Navbar */}
        <AppBar
          position="sticky"
          sx={{ height: 80, display: "flex", justifyContent: "center" }}
          elevation={0}
          className="bg-white"
          color="transparent">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              onClick={() => setLmenu(!lmenu)}
              sx={{ display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="p" clasName="bg-white shadow m-2">Subject : <b>{assignment?.subject}</b> <br /> Exam : {assignment?.name}</Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>

              <FormControl
                variant="standard"
                sx={{ m: 2, minWidth: 200 }}
              >
                <InputLabel id="student-select-label">Status</InputLabel>
                <Select
                  labelId="student-select-label"
                  value={student?.evaluationStatus || ''} // Default to empty string if undefined
                  onChange={handleStatus}
                  disabled={!student?.evaluationStatus} // Simplified condition
                  sx={{
                    backgroundColor: (student?.evaluationStatus === 'Evaluated' && 'green') ||
                      (student?.evaluationStatus === 'Pending' && 'orange') ||
                      (student?.evaluationStatus === 'Absent' && 'red'),
                    color: 'white', // Ensures text is readable on colored backgrounds
                  }}
                >
                  <MenuItem key={1} value="Absent">
                    Absent
                  </MenuItem>
                  <MenuItem key={2} value="Pending">
                    Pending
                  </MenuItem>
                  <MenuItem key={3} value="Evaluated">
                    Evaluated
                  </MenuItem>
                </Select>

              </FormControl>
              <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                <Typography variant="p" clasName="bg-white shadow m-2">Edit - <strong>{student?.name}</strong></Typography>
              </FormControl>
              <Button onClick={() => router.back()} className="h-full">
                <Tooltip title="Back to Dashboard">
                  <IconButton variant="outlined">
                    <ArrowBack color="error" />
                  </IconButton>
                </Tooltip>
              </Button>
              <IconButton
                size="large"
                edge="start"
                onClick={() => setRmenu(!rmenu)}
                sx={{ display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>


        {/* Main White Box */}
        <Box className="h-full p-4 flex-grow m-0 bg-[#F5F5F5] overflow-y-auto rounded-md shadow-md">

          <Box className="bg-white p-0 w-full">
            {page ?
              <div
                style={{ position: "relative", width: "100%", cursor: "crosshair" }}
                onClick={handleImageClick}
              >
                <img
                  src={page}
                  alt="Answer Script"
                  ref={imageRef}
                  className="w-full"
                  style={{ display: "block" }}
                />

                {page && student?.marksBreakdown ? (
                  student.marksBreakdown.map((breakdown, index) => (
                    breakdown.page === page &&
                    breakdown.labels.map((mark, labelIndex) => (
                      (mark.x !== 0 || mark.y !== 0) && (
                        <div
                          key={labelIndex}
                          title={`Label: ${mark.labelName}`}
                          style={{
                            position: "absolute",
                            top: `${mark.y}%`,
                            left: `${mark.x}%`,
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            backgroundColor: mark.labelName === "correct"
                              ? "rgba(0, 128, 0, 0.8)" // Green for correct
                              : mark.labelName === "wrong"
                                ? "rgba(255, 0, 0, 0.8)" // Red for wrong
                                : "rgba(0, 128, 0, 0.8)", // Default green for numeric marks
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onMouseEnter={() => setHoveredMark(labelIndex)} // Set hovered mark index
                          onMouseLeave={() => setHoveredMark(null)} // Clear hovered mark index
                        >
                          {/* Display the appropriate content based on the label */}
                          {mark.labelName === "correct" ? (
                            <DoneIcon style={{ fontSize: "24px", color: "white" }} />
                          ) : mark.labelName === "wrong" ? (
                            <ClearIcon style={{ fontSize: "24px", color: "white" }} />
                          ) : (
                            mark.labelName // Numeric label
                          )}

                          {/* Display X symbol when hovered */}
                          {hoveredMark === labelIndex && (
                            <span
                              onClick={(e) => handleMarkRemove(e, index, labelIndex)}
                              style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                backgroundColor: "white",
                                color: "red",
                                borderRadius: "50%",
                                width: "18px",
                                height: "18px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                fontSize: "12px",
                                display: "flex", // Ensures centering
                                alignItems: "center", // Vertically centers the content
                                justifyContent: "center", // Horizontally centers the content
                                boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow
                              }}
                              title="Remove Mark"
                            >
                              ✖
                            </span>
                          )}
                        </div>)
                    ))
                  ))
                ) : (
                  <></>
                )}

              </div> : <Typography className="p-2" variant="h5">Select Student and Paper</Typography>}

          </Box>
        </Box>
      </div>

      {/* Right Bar */}
      <div className={`bg-white flex flex-col p-4 h-full rounded-md overflow-x-hidden overflow-y-auto shadow-md lg:w-[35vw] ${rmenu
        ? "absolute right-0 max-lg:z-[1200] max-lg:w-[60vw] max-lg:h-full"
        : "max-lg:hidden"
        }`}
        style={{ maxHeight: "100vh" }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">

          <IconButton
            size="large"
            edge="start"
            onClick={() => setRmenu(false)}
            sx={{ display: { lg: "none" } }}
            className="lg:hidden"
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Scrollable Table Section */}
        <div className="flex-grow mb-4 overflow-y-scroll  p-2 custom-scrollbar overflow-hidden" style={{ maxHeight: "40vh" }}>
          <Typography
            variant="subtitle1"
            className="mb-2 text-green-600 font-bold uppercase"
          >
            Questions Table
          </Typography>
          <table className="table-auto w-full text-left text-xs">
            <thead className="bg-green-100 sticky top-0 z-10">
              <tr>
                <th className="p-1 border-b border-green-300">Section</th>
                <th className="p-1 border-b border-green-300">Question</th>
                <th className="p-1 border-b border-green-300">Scored</th>
                <th className="p-1 border-b border-green-300">Max Score</th>
              </tr>
            </thead>
            <tbody>
              {assignment?.assignmentStructure?.map((section, sectionIndex) => (
                <>
                  {/* Section Header */}
                  <tr key={`section-${sectionIndex}`} className="bg-green-200">
                    <td colSpan="4" className="p-1 font-semibold text-green-800">
                      {section.sectionName}
                    </td>
                  </tr>
                  {/* Section Questions */}
                  {section.questions.map((question, questionIndex) => (
                    <tr key={`question-${sectionIndex}-${questionIndex}`} className="hover:bg-green-50">
                      <td className="p-1 text-center">{section.sectionName}</td>
                      <td className="p-1">
                        <Button
                          color={
                            selectedSection === section.sectionName
                              ? "success"
                              : "inherit"
                          }
                          variant={
                            selectedSection === section.sectionName && selectedQuestion === question.questionNo
                              ? "contained"
                              : "outlined"
                          }
                          className={`rounded-full ${selectedSection === section.sectionName
                            ? "bg-green-500 text-white"
                            : "text-green-600"
                            }`}
                          onClick={() => {
                            setSelectedSection(section.sectionName);
                            setSelectedQuestion(question.questionNo);
                          }}
                        >
                          {section.sectionName}.{question.questionNo}
                        </Button>
                      </td>
                      {/* Scored Marks Input */}
                      <td className="p-1 text-center">
                        <input
                          type="number"
                          className="w-full border border-green-300 rounded p-1 text-center"
                          value={calculateTotalMarks(section.sectionName, question.questionNo)} // Use 0 as default value
                          onChange={(e) =>
                            handleScoreChange(section.sectionName, question.questionNo, e.target.value)
                          }
                        />
                      </td>
                      <td className="p-1 text-center">{question.marks}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
            <tfoot className="bg-green-100 sticky bottom-0">
              <tr>
                <td colSpan="2" className="p-1 font-semibold text-right">
                  Total Marks:
                </td>
                <td className="p-1 text-center font-semibold">
                  {/* Calculate total scored marks from marksBreakdown */}
                  {student?.marksBreakdown?.reduce((totalScored, breakdown) =>
                    totalScored + breakdown.labels.reduce((labelTotal, label) => labelTotal + (label.marksGiven || 0), 0),
                    0
                  )}
                </td>
                <td className="p-1 text-center font-semibold">
                  {/* Calculate total maximum marks */}
                  {assignment?.assignmentStructure?.reduce((totalMax, section) =>
                    totalMax + section.questions.reduce((sectionMax, question) => sectionMax + question.marks, 0),
                    0
                  )}
                </td>
              </tr>
            </tfoot>
          </table>

        </div>

        {selectedSection && selectedQuestion ? <div className="mb-4">
          <Typography
            variant="subtitle1"
            className="mb-2 text-green-600 font-bold "
          >
            Comment For {selectedSection} -Q {selectedQuestion}
          </Typography>
          <textarea
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="2"
            placeholder={`Comment for ${selectedSection} - Q${selectedQuestion}`}
            value={
              student.marksBreakdown.find(b => b.page === page)?.comments.find(c => c.sectionName === selectedSection && c.questionNo === selectedQuestion)?.comment || ""
            }
            onChange={(e) => handleCommentChange(
              selectedSection,
              selectedQuestion,
              e.target.value
            )}
          />

        </div> : ""}


        {/* OverAll Comment Box */}
        <div className="mb-4">
          <Typography
            variant="subtitle1"
            className="mb-2 text-green-600 font-bold "
          >
            Recommendations for {student?.name}
          </Typography>
          <textarea
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="2"
            placeholder="Enter your overall performance comment here..."
            value={student.comment ? student.comment : ""}
            onChange={(e) => handleOverallCommentChange(e.target.value)}
          />

        </div>

        {/* Scrollable Pagination Section */}
        <div className="" style={{ maxHeight: "40vh" }}>
          <Typography
            variant="subtitle1"
            className="mb-2 text-green-600 font-bold uppercase"
          >
            Pages
          </Typography>
          <div className="flex items-center m-2 p-2 gap-2 overflow-x-auto">
            {
              student?.answerScript?.map((paper, index) => (
                <Button
                  key={paper.id || index}
                  variant={page === paper ? "contained" : "outlined"}
                  className="mx-1 my-1"
                  value={paper}
                  onClick={() => {
                    setPage('');
                    setPage(paper)
                  }}
                >
                  {index}
                </Button>
              ))
            }
          </div>
        </div>
      </div>


    </main>
  );
}
