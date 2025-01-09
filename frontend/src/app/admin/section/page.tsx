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

export default function Section() {


  const [rowData, setRowData] = useState();
  const modelId = "section";
  const {
    sections, getSections, sectionSeleted, setSectionSelected,
    sectionName,
    setSectionName,
    sectionDescription,
    setSectionDescription,
    editSectionName, setEditSectionName, editSectionDescription, setEditSectionDescription,
    createSection, deleteSection, editSection
  } = useContext(MainContext);

  const inputCreateRef = useRef(null);
  const inputEditRef = useRef(null);
  const inputDeleteRef = useRef(null);

  useEffect(() => {
    getSections();
  }, []);

  useEffect(() => {
    if (rowData) {
      setSectionSelected(rowData._id);
      setEditSectionName(rowData.name);
      setEditSectionDescription(rowData.description);
    }
  }, [rowData]);

  const handleCreateSection = () => {

    if (!sectionName || !sectionDescription) {
      toast.error("fill all the fields");
      return;
    }
    if (inputCreateRef.current) {
      inputCreateRef.current.click();
    }
    createSection();

  };

  const handleEditSection = () => {
    if (!editSectionName || !editSectionDescription) {
      toast.error("ffill all the fields");
      return;
    }
    if (inputEditRef.current) {
      inputEditRef.current.click();
    }
    editSection();
  };

  const handleDeleteSection = () => {
    if (inputDeleteRef.current) {
      inputDeleteRef.current.click();
    }

    deleteSection();
  };

  return (
    <>
      <div className="animate-fade-in-bottom flex flex-col w-full p-4 overflow-x-auto h-full max-sm:max-w-none">

        <Box className="bg-white flex flex-col gap-4 h-full p-4 mb-2"  >
          <Typography variant="h5" component="h2" gutterBottom>
            Section
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/admin/section">section</Link>
          </Breadcrumbs>
          <div className="flex justify-start flex-wrap p-2">
            <div>
              <label htmlFor="newclass_modal" className="btn btn-secondary" >+ New Section</label>
            </div>
          </div></Box>
        <div>
          <TableComponent visibleColumns={['name', 'description']} data={sections} editable={true} deletable={true} action={setRowData} modelName={'section'} />
        </div>
        <input type="checkbox" id="newclass_modal" ref={inputCreateRef} className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Create New Section
              </Typography>
              <TextField
                fullWidth
                label="Section Name"
                variant="standard"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                className="mb-4"
              />
              <TextField
                fullWidth
                label="Section Description"
                multiline
                rows={2}
                variant="standard"
                value={sectionDescription}
                onChange={(e) => setSectionDescription(e.target.value)}
                className="mb-4"
              />
            </Box>
            <div className="modal-action">
              <label htmlFor="newclass_modal" className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateSection}
                className="mt-4"
              >
                Create Section
              </Button>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="newclass_modal">Cancel</label>
        </div>

        <input type="checkbox" id={`edit${modelId}_modal`} ref={inputEditRef} className="modal-toggle" />
        <div className="modal" role="dialog">

          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Edit Section
              </Typography>
              <TextField
                fullWidth
                variant="standard"

                placeholder="Section Name"
                value={editSectionName}
                className="mb-4"
                onChange={(e) => setEditSectionName(e.target.value)}
              />
              <TextField
                fullWidth
                variant="standard"
                placeholder="Section Description"
                value={editSectionDescription}
                className="mb-4"
                onChange={(e) => setEditSectionDescription(e.target.value)}
              />

            </Box>
            <div className="modal-action">
              <label htmlFor={`edit${modelId}_modal`} className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditSection}
                className="mt-4"
              >
                Edit Section
              </Button>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor={`edit${modelId}_modal`}>Cancel</label>
        </div>

        <input type="checkbox" id={`delete${modelId}_modal`} ref={inputDeleteRef} className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <Box className="bg-white flex flex-col gap-4 h-full"  >
              <Typography variant="h6" component="h2" className="text-gray-800 mb-4">
                Delete Section
              </Typography>
              <Typography variant="h5" component="h2" className="text-red-800 mb-4">
                Please Confirm to Section - {rowData?.name} Delete ?
              </Typography>
            </Box>
            <div className="modal-action">
              <label htmlFor={`delete${modelId}_modal`} className="btn">Cancel</label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteSection}
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
