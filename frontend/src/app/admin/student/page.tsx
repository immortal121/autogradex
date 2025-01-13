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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button, Breadcrumbs
} from '@mui/material';

export default function Student() {


  const [rowData, setRowData] = useState();
  const modelId = "student";
  const {
    classes,getClasses,
    students,
    getStudents,createStudent,deleteStudent
  } = useContext(MainContext);

  const inputCreateRef = useRef(null);
  const inputEditRef = useRef(null);
  const inputDeleteRef = useRef(null);


  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    getStudents();
    getClasses();
  }, []);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectedSection(''); // Clear selected section when class changes
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };
  // Password regex (Basic - can be more complex)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; 
  
  const handleSubmit = (e) => { 
    if (!selectedClass || !selectedSection || !name || !email || !password) {
      toast.error("fill all the fields");
      return;
    }
    
    // if (emailRegex.test(email)) {
    //   toast.error("Invalid email format");
    //   return;
    // }
    if (passwordRegex.test(password)) {
      toast.error("Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }
    if (inputCreateRef.current) {
      inputCreateRef.current.click();
    }
    createStudent(name,email,password,selectedClass,selectedSection);
  };
  const handleEditStudent = () => {
    // if (!editSubjectName || !editSubjectDescription) {
    //   toast.error("ffill all the fields");
    //   return;
    // }
    // if (inputEditRef.current) {
    //   inputEditRef.current.click();
    // }
    // editSubject();
  };

  const handleDeleteStudent = () => {
    if (inputDeleteRef.current) {
      inputDeleteRef.current.click();
    }

    deleteStudent(rowData._id);
  };

  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">

        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2"  >
          <Typography variant="h5" component="h2" gutterBottom>
            Student
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/admin/student">Student</Link>

          </Breadcrumbs>
          <div className="flex justify-start gap-4 flex-wrap p-2">
            <div>

              <label htmlFor="newstudent_modal" className="btn btn-secondary" >+ New Sutudent</label>
            </div>
          </div>
        </Box>
        <TableComponent visibleColumns={['name', 'email','class','section']} data={students} editable={true} deletable={true} action={setRowData} modelName={modelId} />
        <input type="checkbox" id="newstudent_modal" ref={inputCreateRef} className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Create New Section
              </Typography>
              <TextField
                fullWidth
                label="Name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4"
              />
              <TextField
                fullWidth
                label="Email"
                variant="standard"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              <FormControl>
                <InputLabel id="class-select-label">Class</InputLabel>
                <Select
                  labelId="class-select-label"
                  id="class-select"
                variant="standard"
                  value={selectedClass}
                  onChange={handleClassChange}
                  label="Class"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {classes.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="section-select-label">Section</InputLabel>
                <Select
                  labelId="section-select-label"
                  id="section-select"
                variant="standard"
                  value={selectedSection}
                  onChange={handleSectionChange}
                  label="Section"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  
                  {selectedClass &&
                    classes.find((c) => c._id === selectedClass)?.sectionDocs.map((section) => (
                      <MenuItem key={section._id} value={section._id}>
                        {section.name}
                      </MenuItem>
                    ))}                    
                </Select>
              </FormControl>
            </Box>
            <div className="modal-action">
              <label htmlFor="newstudent_modal" className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className="mt-4"
              >
                Create Student
              </Button>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="newstudent_modal">Cancel</label>
        </div>
        
        {/* <input type="checkbox" id={`edit${modelId}_modal`} ref={inputEditRef} className="modal-toggle" />
        <div className="modal" role="dialog">

          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Edit Subject
              </Typography>
              <TextField
                fullWidth
                variant="standard"

                placeholder="Subject Name"
                value={editSubjectName}
                className="mb-4"
                onChange={(e) => setEditSubjectName(e.target.value)}
              />
              <TextField
                fullWidth
                variant="standard"
                placeholder="Subject Description"
                value={editSubjectDescription}
                className="mb-4"
                onChange={(e) => setEditSubjectDescription(e.target.value)}
              />

            </Box>
            <div className="modal-action">
              <label htmlFor={`edit${modelId}_modal`} className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditSubject}
                className="mt-4"
              >
                Edit Subject
              </Button>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor={`edit${modelId}_modal`}>Cancel</label>
        </div> */}

        <input type="checkbox" id={`delete${modelId}_modal`} ref={inputDeleteRef} className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Delete Student
              </Typography>
              <Typography variant="h5" component="h2" className="text-red-800 mb-4">
                Please Confirm to Subject - {rowData?.name} Delete ?
              </Typography>
            </Box>
            <div className="modal-action">
              <label htmlFor={`delete${modelId}_modal`} className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteStudent}
                className="mt-4"
              >Confirm
              </Button>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor={`delete${modelId}_modal`}>Cancel</label>
        </div>
      </div>
    </>
  );
}
