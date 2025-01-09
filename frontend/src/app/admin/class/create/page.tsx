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
  Button, Breadcrumbs
} from '@mui/material';

import Grid from "@mui/material/Grid2"
export default function Class() {


  // const [rowData, setRowData] = useState();
  // const modelId = "Class";
  const {
    sections,
    getSections,
    subjects,
    getSubjects,
    createClass,
  } = useContext(MainContext);
  useEffect(() => {
    getSubjects();
    getSections();
  }, [])
  const [className, setClassName] = useState('');

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleSubmit = () => {
    createClass(className, checkedSections.map(s => s), checkedSubjects.map(s => s));
    window.location.href='/admin/class'
  };

  const [checkedSubjects, setCheckedSubjects] = useState([]);

  const [checkedSections, setCheckedSections] = useState([]);

  const handleSubjectsChange = (event) => {
    const { target: { id, checked } } = event;
    if (checked) {
      setCheckedSubjects([...checkedSubjects, id]);
    } else {
      setCheckedSubjects(checkedSubjects.filter((subject) => subject !== id));
    }
  };

  const handleSectionsChange = (event) => {
    const { target: { id, checked } } = event;
    if (checked) {
      setCheckedSections([...checkedSections, id]);
    } else {
      setCheckedSections(checkedSections.filter((section) => section !== id));
    }
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
              <Link href="#" className="btn btn-secondary" >Classes</Link>
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
                id="className"
                label="Class Name"
                variant="standard"
                fullWidth
                value={className}
                onChange={handleClassNameChange}
                margin="normal"
              />

            </Grid>
            <Grid size={6}>


              <FormControl required
                component="fieldset"
                variant="standard">
                <FormLabel component="legend">Select Sections</FormLabel>
                <FormGroup>
                  {sections.map((section) => (
                    <FormControlLabel
                      key={section.id}
                      control={
                        <Checkbox
                          checked={checkedSections.includes(section?._id)}
                          onChange={handleSectionsChange}
                          id={section._id}
                        />
                      }
                      label={section.name}
                    />
                  ))}
                </FormGroup>
                {checkedSections.length === 0 && (
                  <div style={{ color: 'red' }}>Please select at least one section.</div>
                )}
              </FormControl>

            </Grid>
            <Grid size={6}>


              <FormControl required
                component="fieldset"
                variant="standard">
                <FormLabel component="legend">Select Subjects</FormLabel>
                <FormGroup>
                  {subjects.map((subject) => (
                    <FormControlLabel
                      key={subject.id}
                      control={
                        <Checkbox
                          checked={checkedSubjects.includes(subject?._id)}
                          onChange={handleSubjectsChange}
                          id={subject._id}
                        />
                      }
                      label={subject.name}
                    />
                  ))}
                </FormGroup>
                {checkedSubjects.length === 0 && (
                  <div style={{ color: 'red' }}>Please select at least one subject.</div>
                )}

              </FormControl>
            </Grid>
          </Grid>

          <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ p: 2 }} >
            Create Class
          </Button>
        </Box>
      </div >
    </>
  );
}
