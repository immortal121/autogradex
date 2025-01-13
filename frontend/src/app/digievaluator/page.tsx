"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { FiPlus, FiMoreHorizontal, FiSettings, FiUser, FiLogOut, FiFileText, FiEdit, FiTrash, FiArrowRight, FiShoppingCart, FiShoppingBag, FiType, FiPlusCircle, FiKey, FiUsers, FiBook, FiInfo } from "react-icons/fi";
import Link from "next/link";
import { appName } from "@/utils/utils";
import { UploadButton } from "@/utils/uploadthing";
import { MainContext } from "@/context/context";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import Logo from "../../../public/autograde.jpeg";
import * as React from 'react';


//
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import {
  Undo,
  Redo, TextFields, ArrowBack
} from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Button,
  IconButton, TextField, Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { SidebarItem, SubSidebarItem } from "@/utils/SidebarItem";

import { SpaceDashboard, School, CastForEducation, Person, Create } from '@mui/icons-material';
//

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  height: '100%',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


//
export default function Home({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    moreMenuOpen,
    setMoreMenuOpen,
    showMenu,
    setShowMenu,
    user,
    setSelectedTab,
    evaluators,
    selectedEvaluator,
    setSelectedEvaluator,
    classes,
    selectedClass,
    getClasses,
    getStudents,
  } = useContext(MainContext);

  const pathname = usePathname();

  useEffect(() => {

    if (typeof window !== 'undefined') {
      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
      }
    }
  }, []);

  useEffect(() => {
    if (selectedClass !== -1) {
      getStudents(classes[selectedClass]?._id);
    }
  }, [selectedClass]);

  // 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';


  const [selectedStudent, setSelectedStudent] = useState(1);
  const students = [1, 2, 3];

  const handleStudentSelection = (event) => {
    setSelectedStudent(event.target.value);
  };

  //

  const renderMenu = (

    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => {
        localStorage.clear()
        window.location.href = "/";
      }}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted

      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="student-select-label">Student</InputLabel>
          <Select
            labelId="student-select-label"
            id="student-select"
            value={selectedStudent} // Default to first student
            onChange={handleStudentSelection}
            label="Student"
          >
            {students.map((student) => (
              <MenuItem key={student} value={student}>
                Student {student}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MenuItem>
      <Divider />
      <MenuItem >
        <ListItemIcon>
          <ArrowBack fontSize="small" color="error" />
        </ListItemIcon>
        Back To Dashboard
      </MenuItem>
    </Menu>
  );

  // question and answer 
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedMark, setSelectedMark] = useState(null);
  const [selectedMarks, setSelectedMarks] = useState({}); // Object to store marks for each question

  const questions = [
    { label: 'A', totalMarks: 5 },
    { label: 'B', totalMarks: 3 },
    { label: 'C', totalMarks: 2 },
  ];
  const handleQuestionClick = (questionLabel) => {
    setSelectedQuestion(questionLabel);
  };

  const handleMarkClick = (mark) => {
    setSelectedMark(mark);
  };
  const handleMarkChange = (questionLabel, event) => {
    const newMark = parseInt(event.target.value, 10);
    setSelectedMarks({ ...selectedMarks, [questionLabel]: newMark });
  };
  //
  return (
    <main className="flex bg-base-100 h-screen w-screen m-0 max-sm:p-0" onClick={() => {
      if (moreMenuOpen) setMoreMenuOpen(false);
    }}>
      {/* Sidebar */}
      <div className={'print custom-scrollbar  bg-white flex flex-col p-4 min-w-[320px] max-w-[15vw] h-full rounded-md ' + (!showMenu ? "max-sm:hidden " : "max-sm:fixed max-sm:w-full max-sm:h-full max-sm:max-w-none max-sm:z-[1200] ")}>
        <div className="flex justify-between md:justify-center items-center max-sm:mb-4">
          <Link href="/"><div className="mb-5 font-semibold max-sm:mb-3" onClick={() => setSelectedEvaluator(-1)}>
            <Image src={Logo} height={50} alt="autogradex" />
          </div></Link>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setShowMenu(!showMenu)}
            className="absolute"
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className='p-1 my-2 h-full w-full overflow-hidden bg-gray-50 no-scrollbar hover:overflow-y-auto'>

          <Box
            sx={{
              borderRadius: '8px',
              p: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <div>
              <Typography variant="h6">Questions</Typography>
              <TableContainer >
                <Table >
                  <TableHead >
                    <TableRow>
                      <TableCell sx={{
                        p: 1,
                      }}>Question</TableCell>
                      <TableCell sx={{
                        p: 1,
                      }}>Total</TableCell>
                      <TableCell sx={{
                        p: 1,
                      }}>Scored</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>


                    {questions.map((question) => (
                      <TableRow key={question.label}>
                        <TableCell>
                          <Button
                            variant={selectedQuestion === question.label ? 'contained' : 'outlined'}
                            onClick={() => handleQuestionClick(question.label)}
                            sx={{ width: '100%' }}
                          >
                            {question.label}
                          </Button>
                        </TableCell>
                        <TableCell>{question.totalMarks}</TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            inputProps={{ min: 0, max: question.totalMarks }} // Set min and max values
                            value={selectedMarks[question.label] || 0}
                            onChange={(event) => handleMarkChange(question.label, event)}
                            sx={{ width: '100%' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </TableContainer>


            </div>

            <div>
              <Typography variant="h6">Marks</Typography>
              <Grid container spacing={1}>
                {Array.from({ length: 19 }, (_, i) => (
                  <Grid item key={i}>
                    <Button
                      variant={selectedMark === i / 2 ? 'contained' : 'outlined'}
                      onClick={() => handleMarkClick(i / 2)}
                    // sx={{ borderRadius: '50%', width: '30px', height: '30px' }}
                    >
                      {i / 2}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </div>

            <div>
              <Typography variant="h6">Actions</Typography>
              <Grid container spacing={1}>
                <Grid item>
                  <Tooltip title="Undo">
                    <IconButton>
                      <Undo sx={{ borderRadius: '50%' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Redo">
                    <IconButton>
                      <Redo sx={{ borderRadius: '50%' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Text Tool">
                    <IconButton>
                      <TextFields sx={{ borderRadius: '50%' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center'>
            <div className="avatar placeholder mr-2">
              <div className="bg-blue-700 text-white mask mask-squircle w-10">
                <span><FiUser /></span>
              </div>
            </div>
            <p className='font-semibold'>{user?.name}</p>
          </div>
        </div>
      </div>
      {/* Main */}
      <div className='flex flex-col m-0 w-full h-full '>
        {/* nav bar  */}
        <AppBar position="sticky" sx={{ height: 80, display: 'flex', justifyContent: 'center' }} elevation={0} color='transparent'>
          <Toolbar >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setShowMenu(!showMenu)}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, }}

            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />
            <Box className="items-center" sx={{ display: { xs: 'none', md: 'block' } }}>
              <FormControl sx={{ m: 2, minWidth: 200 }}>
                <InputLabel id="student-select-label">Student</InputLabel>
                <Select
                  labelId="student-select-label"
                  id="student-select"
                  value={selectedStudent} // Default to first student
                  onChange={handleStudentSelection}
                  label="Student"
                >
                  {students.map((student) => (
                    <MenuItem key={student} value={student}>
                      Student {student}
                    </MenuItem>
                  ))}
                </Select>

              </FormControl>
              <FormControl>
              <Link href="/" >
                <ListItemIcon>
                  <ArrowBack fontSize="small" color="error" />
                </ListItemIcon>
                Back To Dashboard
              </Link>

              </FormControl>

            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>

          </Toolbar>

          {renderMobileMenu}
          {renderMenu}
        </AppBar>
        <Box className="bg-white h-screen">
        </Box>
      </div>

    </main >
  );
}
