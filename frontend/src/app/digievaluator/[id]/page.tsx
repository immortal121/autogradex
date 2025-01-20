"use client";
import React, { useState, useEffect, useContext, useRef } from "react";

import { useParams } from "next/navigation";
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

  const [lmenu, setLmenu] = useState(false); // Controls left bar visibility on small screens
  const [rmenu, setRmenu] = useState(false); // Placeholder for right bar toggle
  const [student, setStudent] = useState([]);
  const [url, setUrl] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState([]); // Store marks for the student's page
  const [scores, setScores] = useState({}); // Store scores for the student's assignment
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(1);
  const { assignments, getFilteredAssignment, updateAssignmentStudents } = useContext(MainContext);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState();
  const [selectedSection, setSelectedSection] = useState(null);
  const [hoveredMark, setHoveredMark] = useState();
  const [globalState, setGlobalState] = useState({});

  const imageRef = useRef();

  const marksLabels = [
    0.5,
    ...Array.from({ length: 11 }, (_, i) => i), // "0" to "10"
  ];

  const tools = ["Undo", "Redo", "Tick", "Wrong"];

  // const [data,setData] = useState([{}]);

  const [update,setUpdate] = useState(false);

  // Fetch assignment details and students on page load
  useEffect(() => {
    const fetchData = async () => {
      const assignmentData = await getFilteredAssignment(id);
      setStudent(assignmentData.students || []); // Store students data
    };
    fetchData();
  }, [id,update]);


  useEffect(() => {
    console.log("global state :"+globalState);
    resetStudentData();
    // loadStudentPageData(student.id, 0);
    setUpdate(!update);
  }, [url]);



  // Load data from localStorage for a specific student and page
  // const loadStudentPageData = (studentId, page) => {
  //   const savedData = localStorage.getItem(`student_${studentId}_page_${page}`);

  //   if (savedData) {
  //     const parsedData = JSON.parse(savedData);
  //     setMarks(parsedData.marks || []);
  //     setScores(parsedData.scores || {});
  //   }
  // };

  // Reset data when switching students
  const resetStudentData = () => {
    setMarks([]);
    setScores({});
    setHistory([]);
    setHistoryIndex(-1);
  };


  // Handle score change logic
  const handleScoreChange = (section, question, value) => {
    const key = `${section.sectionName}-${question.questionNo}`;
    const maxScore = question.marks;

    if (parseFloat(value) > maxScore) {
      alert(`The entered score (${value}) exceeds the maximum score (${maxScore}) for this question.`);
      return;
    }

    setScores((prevScores) => {
      const updatedScores = { ...prevScores, [key]: value };
      addHistoryState(marks, updatedScores); // Save state for undo/redo

      return updatedScores;
    });

    // Save current state to localStorage
    saveToGlobalState(selectedStudent.id, url, marks, scores); // Assuming page 1 for example
  };

  // Save the current state to localStorage
  
  const saveToGlobalState = (studentId, page, marks, scores) => {
    setGlobalState((prevState) => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        [page]: {
          marks: { ...marks },
          scores: { ...scores },
        },
      },
    }));
  };
  

  // Handle image click for marking
  // const handleImageClick = (e) => {
  //   if (!selectedQuestion) {
  //     alert("Please select a question first before marking.");
  //     return;
  //   }

  //   if (!selectedLabel) {
  //     alert("Please select a Mark / Label first before marking.");
  //     return;
  //   }

  //   const rect = imageRef.current.getBoundingClientRect();
  //   const x = ((e.clientX - rect.left) / rect.width) * 100;
  //   const y = ((e.clientY - rect.top) / rect.height) * 100;

  //   const questionKey = `${selectedQuestion.sectionName}-${selectedQuestion.questionNo}`;
  //   const newMarkValue = (parseFloat(scores[questionKey] || 0) + parseFloat(selectedLabel)).toFixed(2);

  //   if (newMarkValue > selectedQuestion.marks) {
  //     alert(`The total score (${newMarkValue}) exceeds the maximum score (${selectedQuestion.marks}) for this question.`);
  //     return;
  //   }

  //   const newMarks = [
  //     ...marks,
  //     {
  //       questionKey,
  //       label: selectedLabel,
  //       x: x.toFixed(2),
  //       y: y.toFixed(2),
  //     },
  //   ];

  //   setMarks(newMarks);
  //   handleScoreChange({ sectionName: selectedQuestion.sectionName }, selectedQuestion, newMarkValue);
  //   setSelectedLabel(null);
  //   addHistoryState(newMarks, scores); // Save state for undo/redo
  // };

  // Save history state for undo/redo
  
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
  
    const questionKey = `${selectedQuestion.sectionName}-${selectedQuestion.questionNo}`;
    const newMarkValue = (parseFloat(scores[questionKey] || 0) + parseFloat(selectedLabel)).toFixed(2);
  
    if (newMarkValue > selectedQuestion.marks) {
      alert(`The total score (${newMarkValue}) exceeds the maximum score (${selectedQuestion.marks}) for this question.`);
      return;
    }
  
    const pageMarks = marks[url] || []; // Retrieve existing marks for the current page
    const newMarksForPage = [
      ...pageMarks,
      {
        questionKey,
        label: selectedLabel,
        x: x.toFixed(2),
        y: y.toFixed(2),
      },
    ];
  
    const updatedMarks = {
      ...marks,
      [url]: newMarksForPage, // Update marks for the current page
    };
  
    setMarks(updatedMarks);
    handleScoreChange({ sectionName: selectedQuestion.sectionName }, selectedQuestion, newMarkValue);
    setSelectedLabel(null);
    addHistoryState(updatedMarks, scores); // Save state for undo/redo
  };

  const addHistoryState = (newMarks, newScores) => {
    // Truncate redo history if a new action is performed
    const updatedHistory = history.slice(0, historyIndex + 1);
  
    // Add the new state to the history
    updatedHistory.push({ marks: { ...newMarks }, scores: { ...newScores } });
  
    // Update history and reset the historyIndex to the latest state
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };
  
  // Remove a mark
  const handleMarkRemove = (e, index, mark) => {
    e.stopPropagation();
  
    // Create a copy of the marks for the current page
    const pageMarks = [...(marks[url] || [])];
  
    // Remove the specific mark by index
    const newPageMarks = pageMarks.filter((_, i) => i !== index);
  
    // Update the score for the affected question
    const updatedScore = parseFloat(scores[mark.questionKey] || 0) - parseFloat(mark.label);
  
    // Update marks globally
    const newMarks = {
      ...marks,
      [url]: newPageMarks,
    };
  
    setMarks(newMarks);
    setScores((prevScores) => {
      const updatedScores = {
        ...prevScores,
        [mark.questionKey]: updatedScore > 0 ? updatedScore.toFixed(2) : "",
      };
  
      // Save state for undo/redo
      addHistoryState(newMarks, updatedScores);
      return updatedScores;
    });
  
    // Save current state to localStorage after mark removal
    saveToGlobalState(selectedStudent.id, page, newMarks, scores);
  };
  
  // Undo functionality
  const undo = () => {
    if (historyIndex > 0) {
      // Move one step back in the history
      const prevState = history[historyIndex - 1];
  
      // Update marks and scores based on the previous state
      setMarks(prevState.marks);
      setScores(prevState.scores);
  
      // Update the history index
      setHistoryIndex(historyIndex - 1);
    } else {
      alert("No more undo history.");
    }
  };
  
  // Redo functionality
  const redo = () => {
    if (historyIndex < history.length - 1) {
      // Move one step forward in the history
      const nextState = history[historyIndex + 1];
  
      // Update marks and scores based on the next state
      setMarks(nextState.marks);
      setScores(nextState.scores);
  
      // Update the history index
      setHistoryIndex(historyIndex + 1);
    } else {
      alert("No more redo history.");
    }
  };
  
  // Update student assignments after marking update
  const updateStudentAssignments = () => {
    updateAssignmentStudents(id, selectedStudent, marks, scores); // Method to update the assignment with the current marks and scores
  };
  console.log(marks[url]);


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

            <Tooltip title="Redo">
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
              </Button></Tooltip>
            <Tooltip title="Right">
              <Button
                variant={"contained"}
                // onClick={() => setToolSelected(tool)}
                color="success"
              >
                <DoneIcon />
              </Button></Tooltip>
            <Tooltip title="Wrong">
              <Button
                variant={"contained"}
                // onClick={() => setToolSelected(tool)}

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
            <Typography variant="p" clasName="bg-white shadow m-2">Subject : <b>{assignments?.subject}</b> <br /> Exam : {assignments?.name}</Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>

              <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                <InputLabel id="student-select-label">Student</InputLabel>
                <Select
                  labelId="student-select-label"
                  onChange={(e) => setStudent(e.target.value)}
                  label="Student"
                >
                  {assignments?.students?.map((student) => (
                    <MenuItem key={student.id} value={student}>
                      {student.name}
                    </MenuItem>
                  ))}
                </Select>

              </FormControl>
              <Link href="/" className="h-full">
                <Tooltip title="Back to Dashboard">
                  <IconButton variant="outlined">
                    <ArrowBack color="error" />
                  </IconButton>
                </Tooltip>
              </Link>
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
            {url ?
              <div
                style={{ position: "relative", width: "100%", cursor: "crosshair" }}
                onClick={handleImageClick}
              >
                <img
                  src={url}
                  alt="Answer Script"
                  ref={imageRef}
                  className="w-full"
                  style={{ display: "block" }}
                />
                {url && marks[url] ? (marks[url].map((mark, index) => (
                  <div
                    key={index}
                    title={`Label: ${mark.label}`}
                    style={{
                      position: "absolute",
                      top: `${mark.y}%`,
                      left: `${mark.x}%`,
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      backgroundColor: "rgba(0, 128, 0, 0.8)",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={() => setHoveredMark(index)} // Set hovered mark index
                    onMouseLeave={() => setHoveredMark(null)} // Clear hovered mark index
                  >
                    {mark.label}
                    {/* Display X symbol when hovered */}
                    {hoveredMark === index && (
                      <span
                        onClick={(e) => handleMarkRemove(e, index, mark)}
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
                  </div>
                ))):""}
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
              {assignments?.assignmentStructure.map((section, sectionIndex) => (
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
                            selectedSection === section && selectedStudent === student
                              ? "success"
                              : "inherit"
                          }

                          variant={selectedSection === section && selectedStudent === student && selectedQuestion.questionNo === question.questionNo ? "contained" : "outlined"}
                          className={`rounded-full ${selectedSection === section && selectedStudent === student
                            ? "bg-green-500 text-white"
                            : "text-green-600"
                            }`}
                          onClick={() => {
                            setSelectedSection(section);
                            setSelectedStudent(student);
                            setSelectedQuestion({ ...question, sectionName: section.sectionName });

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
                          value={scores[`${section.sectionName}-${question.questionNo}`] || ""}
                          onChange={(e) =>
                            handleScoreChange(section, question, e.target.value)
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
                  {Object.values(scores).reduce((sum, score) => sum + parseFloat(score || 0), 0)}
                </td>
                <td className="p-1 text-center font-semibold">
                  {assignments?.assignmentStructure.reduce(
                    (totalMax, section) =>
                      totalMax +
                      section.questions.reduce(
                        (sectionMax, question) => sectionMax + question.marks,
                        0
                      ),
                    0
                  )}
                </td>
              </tr>
            </tfoot>
          </table>

        </div>

        {/* Comment Box */}
        <div className="mb-4">
          <Typography
            variant="subtitle1"
            className="mb-2 text-green-600 font-bold "
          >
            Comments
          </Typography>
          <textarea
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="4"
            placeholder="Write your comment here..."
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
                  variant="outlined"
                  className="mx-1 my-1"
                  value={paper}
                  onClick={(e) => setUrl(e.target.value)}
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
