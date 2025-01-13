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
  FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText, Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Button, Breadcrumbs,Divider
} from '@mui/material';

import Grid from "@mui/material/Grid2"
export default function Class() {


  const {
    classes,
    getClasses, sections, getSections,
    subjects,
    getSubjects,
    createTeacher,
  } = useContext(MainContext);
  useEffect(() => {
    getSubjects();
    getSections();
    getClasses();
  }, [])


  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  //
  const [assignments, setAssignments] = useState([{ class: '', section: '', subject: '' }]);

  const handleTeachingAssignmentChange = (index, updatedAssignment) => {
    const newAssignments = [...assignments];
    newAssignments[index] = updatedAssignment;
    setAssignments(newAssignments);
  };

  const addTeachingAssignment = () => {
    setAssignments([...assignments, { class: '', section: '', subject: '' }]);
  };

  const removeTeachingAssignment = (index) => {
    if (assignments.length > 1) { // Prevent removing the only assignment
      const newAssignments = [...assignments];
      newAssignments.splice(index, 1);
      setAssignments(newAssignments);
    }
  };

  const handleSubmit = () => {
    // Check for empty fields
    if (!name || !password || !email || assignments.length === 0) {
      alert('Please fill all required fields.');
      return;
    }

    // Check for missing selections in assignments
    const hasMissingSelections = assignments.some(
      (assignment) =>
        !assignment.class ||
        !assignment.section ||
        !assignment.subject
    );

    if (hasMissingSelections) {
      alert('Please select class, section, and subject for all teaching assignments.');
      return;
    }

    // Proceed with creating the teacher 
    createTeacher(name, email,password, assignments);

    // Optional: Redirect after successful creation
    window.location.href = '/admin/teacher'; 
  };

  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">

        <Box className="bg-white flex flex-col gap-4 p-4 mb-2"  >
          <Typography variant="h5" component="h2" gutterBottom>
            Create
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/admin/Class">Class</Link>

            <Link underline="hover" color="inherit" href="/admin/Class/create">Create</Link>
          </Breadcrumbs>
          <div className="flex justify-start gap-4 flex-wrap p-2">

            <div>
              <Link href="/admin/teacher" className="btn btn-secondary" >Teachers</Link>
            </div>
          </div>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate className="bg-white flex flex-col gap-4 p-4 mb-2" >
          <Typography variant="h5" component="h2" gutterBottom>
            Create New Class
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                id="teacherName"
                label="Teacher Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                id="teacherName"
                label="Teacher Email"
                variant="standard"
                type='email'
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
            </Grid>

            <Grid size={12}>
              <TextField
                id="teacherName"
                label="Teacher Password"
                variant="standard"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid size={12}>
              <FormControl required component="fieldset" variant="standard">
                <FormLabel component="legend" className="mb-4">Select Teaching Assignments</FormLabel>
                <Grid container spacing={2} className="w-full">
                  {assignments.map((assignment, index) => (
                     <Grid container size={12} className="w-full">
              
                      <Grid item  size={{ xs: 12, lg: 4 }}>
                        <FormControl required fullWidth>
                          <InputLabel id="class-label">Class</InputLabel>
                          <Select
                            labelId="class-label"
                            id="class"
                            value={assignment.class}
                            label="Class"
                            onChange={(event) => handleTeachingAssignmentChange(index, { ...assignment, class: event.target.value })}
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
                      <Grid item size={{ xs: 12, lg: 4 }}>
                        <FormControl required fullWidth>
                          <InputLabel id="class-label">Section</InputLabel>
                          <Select
                            labelId="class-label"
                            id="class"
                            value={assignment.section}
                            label="Section"
                            onChange={(event) => handleTeachingAssignmentChange(index, { ...assignment, section: event.target.value })}
                          >
                            <MenuItem value="">Select Class</MenuItem>
                            {classes.find((c) => c._id === assignment.class) &&
                              classes.find((c) => c._id === assignment.class).sectionDocs?.map((section) => (
                              <MenuItem key={section._id} value={section._id}>
                                {section.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item size={{ xs: 12, lg: 4 }}>                        
                        <FormControl required fullWidth>
                          <InputLabel id="class-label">Subject</InputLabel>
                          <Select
                            labelId="class-label"
                            id="class"
                            value={assignment.subject}
                            label="Subject"
                            onChange={(event) => handleTeachingAssignmentChange(index, { ...assignment, subject: event.target.value })}
                          >
                            <MenuItem value="">Select Class</MenuItem>
                            {classes.find((c) => c._id === assignment.class) &&
                              classes.find((c) => c._id === assignment.class).subjectDocs?.map((subject) => (
                              <MenuItem key={subject._id} value={subject._id}>
                                {subject.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {index > 0 && (
                        <Grid size={12}>
                          <Button variant="contained" color="error" size="small" onClick={() => removeTeachingAssignment(index)}>
                            Remove Assignment
                          </Button>
                        </Grid>
                      )}
                      <hr/>
                    </Grid>
                  ))}
                  <Grid size={12}>
                    <Button variant="contained" onClick={addTeachingAssignment}>
                      Add Teaching Assignment
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ p: 2 }}>
                Create Teacher
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div >
    </>
  );
}
