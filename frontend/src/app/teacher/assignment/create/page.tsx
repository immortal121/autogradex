"use client";
import { useContext, useState, useEffect } from "react";
import { MainContext } from "@/context/context";
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
  Button,
  Breadcrumbs,
  Accordion,
  IconButton,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";

export default function CreateAssignment() {
  const {
    sections,
    getSections,
    subjects,
    getSubjects,
    createClass,
    getClasses,
    classes,
    convertPDFToImage,createAssignment,
  } = useContext(MainContext);

  const [isClient, setIsClient] = useState(false);
  const [assignmentName, setAssignmentName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questionPaper, setQuestionPaper] = useState([]);
  const [answerSheet, setAnswerSheet] = useState([]);
  const [formState, setFormState] = useState({
    sections: [
      {
        sectionName: '',
        questions: [],
      },
    ],
  });

  useEffect(() => {
    getSubjects();
    getSections();
    getClasses();
    setIsClient(true);
  }, []);

  const handleAddSection = () => {
    setFormState((prevState) => ({
      ...prevState,
      sections: [
        ...prevState.sections,
        { sectionName: `Section ${prevState.sections.length + 1}`, questions: [] },
      ],
    }));
  };

  const handleDeleteSection = (sectionIndex) => {
    setFormState((prevState) => ({
      ...prevState,
      sections: prevState.sections.filter((_, i) => i !== sectionIndex),
    }));
  };

  const handleAddQuestion = (sectionIndex) => {
    setFormState((prevState) => ({
      ...prevState,
      sections: prevState.sections.map((section, index) =>
        index === sectionIndex
          ? {
            ...section,
            questions: [
              ...section.questions,
              { questionNo: '', marks: '', description: '' },
            ],
          }
          : section
      ),
    }));
  };

  const handleDeleteQuestion = (sectionIndex, questionIndex) => {
    setFormState((prevState) => ({
      ...prevState,
      sections: prevState.sections.map((section, index) =>
        index === sectionIndex
          ? {
            ...section,
            questions: section.questions.filter((_, i) => i !== questionIndex),
          }
          : section
      ),
    }));
  };

  const handleSubmit = () => {
    if (!assignmentName || !selectedClass || !selectedSection || !selectedSubject) {
      toast.error("Please fill all the mandatory fields!");
      return;
    }

    if (questionPaper.length === 0) {
      toast.error("Please upload the question paper!");
      return;
    }

    if (answerSheet.length === 0) {
      toast.error("Please upload the answer sheet!");
      return;
    }

    // Check if each section has at least one question
    const hasValidSections = formState.sections.every((section) => {
      return section.sectionName && section.questions.length > 0;
    });

    if (!hasValidSections) {
      toast.error("Each section must have at least one question!");
      return;
    }

    // Validate that each question has a number, marks, and description
    const hasValidQuestions = formState.sections.every((section) =>
      section.questions.every((question) =>
        question.questionNo && question.marks )
    );

    if (!hasValidQuestions) {
      toast.error("Each question must have a number, marks, and description!");
      return;
    }

    // Prepare the data to send to createAssignment
    const assignmentData = {
      name: assignmentName,
      subject: selectedSubject,
      class: selectedClass,
      section: selectedSection,
      questionPaper:questionPaper.map((file) => file.url),
      keyAnswerScript: answerSheet.map((file) => file.url),
      assignmentStructure: formState.sections.map((section) => ({
        sectionName: section.sectionName,
        questions: section.questions.map((question) => ({
          questionNo: question.questionNo,
          marks: question.marks,
          description: question.description,
        })),
      })),
    };

    // Call createAssignment function (assuming it's provided through context or props)
    createAssignment(assignmentData);

    toast.success('Assignment created successfully!');
    window.location.href="/teacher/assignment";
  };

  const handleFilePreview = (files) =>
    files.map((file) => ({
      url: file.url,
      type: file.type === "application/pdf" ? "pdf" : "image",
    }));

  // Preview Component for displaying uploaded files
  const FilePreview = ({ files, setFiles }) => (
    <div className="flex flex-wrap mt-2">
      {files.map((file, index) => (
        <div key={index} className="relative mr-4 mb-4">
          {file.type === "pdf" ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => window.open(file.url)}
            >
              View PDF
            </Button>
          ) : (
            <Image
              src={file.url}
              alt="Preview"
              width="20"
              height="20"
              className="w-20 h-20 object-cover rounded-md cursor-pointer"
              onClick={() => window.open(file.url)}
            />
          )}
          <IconButton
            size="small"
            className="absolute top-0 right-0"
            onClick={() =>
              setFiles(files.filter((_, fileIndex) => fileIndex !== index))
            }
          >
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      ))}
    </div>
  );


  return (
    <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">
      <Box className="bg-white flex flex-col gap-4 p-4 mb-2">
        <Typography variant="h5" component="h2" gutterBottom>
          Create Assignment
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/teacher">
            Home
          </Link>
          <Link color="inherit" href="/teacher/assignment">
            Assignment
          </Link>
          <Link color="inherit" href="/teacher/assignment/create">
            Create
          </Link>
        </Breadcrumbs>
      </Box>

      <Box component="form" noValidate className="bg-white flex flex-col gap-4 p-4 mb-2">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <TextField
              id="assignment-name"
              label="Assignment Name"
              variant="standard"
              fullWidth
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={8} container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="class-label">Class</InputLabel>
                <Select
                  labelId="class-label"
                  id="class"
                  variant="standard"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <MenuItem value="">Select Class</MenuItem>
                  {classes.map((classe) => (
                    <MenuItem key={classe._id} value={classe._id}>
                      {classe.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="section-label">Section</InputLabel>
                <Select
                  labelId="section-label"
                  variant="standard"
                  id="section"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  disabled={!selectedClass}
                >
                  <MenuItem value="">Select Section</MenuItem>
                  {classes.find((c) => c._id === selectedClass)?.sectionDocs?.map((section) => (
                    <MenuItem key={section._id} value={section._id}>
                      {section.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="subject-label">Subject</InputLabel>
                <Select
                  labelId="subject-label"
                  id="subject"
                  variant="standard"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={!selectedSection}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  {classes.find((c) => c._id === selectedClass)?.subjectDocs?.map((subject) => (
                    <MenuItem key={subject._id} value={subject._id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography variant="subtitle1">Question Paper</Typography>
            {questionPaper.length > 0 ? (
              <FilePreview files={questionPaper} setFiles={setQuestionPaper} />
            ) : (
              <UploadDropzone
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
                  const files = handleFilePreview(res);
                  setQuestionPaper(files);
                }}
                onUploadError={(error) => alert(`Error: ${error.message}`)}
              />
            )}
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography variant="subtitle1">Answer Sheet</Typography>
            {answerSheet.length > 0 ? (
              <FilePreview files={answerSheet} setFiles={setAnswerSheet} />
            ) : (
              <UploadDropzone
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
                  const files = handleFilePreview(res);
                  setAnswerSheet(files);
                }}
                onUploadError={(error) => alert(`Error: ${error.message}`)}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" className="my-2">
              Question Paper Structure
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSection}
              startIcon={<AddCircleIcon />}
              sx={{ my: 2 }}
            >
              Add Section
            </Button>

            {isClient ? formState.sections.map((section, sectionIndex) => (
              <Accordion key={sectionIndex} className="my-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <TextField
                    label="Section Name"
                    value={section.sectionName}
                    onChange={(e) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        sections: prevState.sections.map((sec, idx) =>
                          idx === sectionIndex
                            ? { ...sec, sectionName: e.target.value }
                            : sec
                        ),
                      }))
                    }
                  />
                  <IconButton onClick={() => handleDeleteSection(sectionIndex)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  {section.questions.map((question, questionIndex) => (
                    <Grid container spacing={2} className="my-2" key={questionIndex}>
                      <Grid item xs={3}>
                        <TextField
                          label="Question No"
                          value={question.questionNo}
                          onChange={(e) =>
                            setFormState((prevState) => ({
                              ...prevState,
                              sections: prevState.sections.map((sec, secIdx) =>
                                secIdx === sectionIndex
                                  ? {
                                    ...sec,
                                    questions: sec.questions.map((q, qIdx) =>
                                      qIdx === questionIndex
                                        ? { ...q, questionNo: e.target.value }
                                        : q
                                    ),
                                  }
                                  : sec
                              ),
                            }))
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Marks"
                          value={question.marks}
                          onChange={(e) =>
                            setFormState((prevState) => ({
                              ...prevState,
                              sections: prevState.sections.map((sec, secIdx) =>
                                secIdx === sectionIndex
                                  ? {
                                    ...sec,
                                    questions: sec.questions.map((q, qIdx) =>
                                      qIdx === questionIndex
                                        ? { ...q, marks: e.target.value }
                                        : q
                                    ),
                                  }
                                  : sec
                              ),
                            }))
                          }
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          label="Description"
                          fullWidth
                          value={question.description}
                          onChange={(e) =>
                            setFormState((prevState) => ({
                              ...prevState,
                              sections: prevState.sections.map((sec, secIdx) =>
                                secIdx === sectionIndex
                                  ? {
                                    ...sec,
                                    questions: sec.questions.map((q, qIdx) =>
                                      qIdx === questionIndex
                                        ? { ...q, description: e.target.value }
                                        : q
                                    ),
                                  }
                                  : sec
                              ),
                            }))
                          }
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          onClick={() => handleDeleteQuestion(sectionIndex, questionIndex)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddQuestion(sectionIndex)}
                    startIcon={<AddCircleIcon />}
                    sx={{ my: 2 }}
                  >
                    Add Question
                  </Button>
                </AccordionDetails>
              </Accordion>
            )) : ""}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              sx={{ p: 2 }}
            >
              Create Assignment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
