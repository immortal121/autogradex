"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";
// import { MainContext } from "@/context/context";
import { MainContext } from "@/context/context";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import Logo from "../../../public/autograde.jpeg";
import * as React from 'react';

import {ListItem,ListItemAvatar,ListItemText} from "@mui/material";
import useAuth from '@/utils/useAuth'; // Import the hook
// 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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
    showMenu,
    setShowMenu,
    fetchUser,
    user,

  } = useContext(MainContext);


  useEffect(() => {
    fetchUser();
  }, []);
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

  const renderMenu = (

    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}

      className="print"
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
          <LogoutIcon fontSize="small" className="text-red-500" />
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

      className="print"

      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <Divider />
      <MenuItem onClick={() => {
        localStorage.clear()
        window.location.href = "/";
      }} >
        <ListItemIcon>
          <LogoutIcon fontSize="small" className="text-red-500" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <main className="flex bg-base-100 h-screen w-screen m-0 max-sm:p-0 overflow-hidden" >
      {/* Sidebar */}
      <div className={'print  bg-white flex flex-col p-2 m-0 min-w-[275px] max-w-[15vw] h-full rounded-md ' + (!showMenu ? "max-sm:hidden " : "max-sm:fixed max-sm:w-full max-sm:h-full max-sm:max-w-none max-sm:z-[1200] ")}>
        <div className="flex justify-between md:justify-center items-center max-sm:mb-4">
          <Link href="/"><div className="mb-4 font-semibold max-sm:mb-3">
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
        <div className='p-0 my-2 h-full print no-scrollbar w-full overflow-hidden hover:overflow-y-auto'>

          {/*  classes?.map((_class: any, i: number) => {
               return <div key={i} className={(selectedClass === i ? ' bg-base-200 ' : ' bg-transparent hover:bg-base-200 ') + 'cursor-pointer flex flex-col px-3 py-2 rounded-md w-full mb-1'} onClick={() => { setSelectedClass(i); setShowMenu(false) }}>
            //     <div className='flex justify-start items-center'>
            //       <div className='w-fit mr-2'>
            //         <FiUsers />
            //       </div>
            //       <div className='flex flex-col items-start'>
            //         <p className='text-sm text-ellipsis line-clamp-1 font-semibold'>{_class.subject}</p>
            //         <p className='text-xs text-ellipsis line-clamp-1'>{_class.name} {_class.section}</p>
            //       </div>
            //     </div>
            //     {selectedClass === i ?
            //       <div className='flex mt-2'>
            //         <label htmlFor='editclass_modal' className='cursor-pointer flex justify-center items-center w-full p-2 bg-base-300 rounded-md mr-1 hover:bg-gray-500 hover:text-white' onClick={() => {
            //           setEditClassName(classes[i].name);
            //           setEditClassSection(classes[i].section);
            //           setEditClassSubject(classes[i].subject);
            //         }}>
            //           <FiEdit /><p className='ml-2 text-xs'>Edit</p>
            //         </label>
            //         <label htmlFor='deleteclass_modal' className='cursor-pointer flex justify-center items-center w-full p-2 bg-base-300 rounded-md hover:bg-red-500 hover:text-white'>
            //           <FiTrash /><p className='ml-2 text-xs'>Delete</p>
            //         </label>
                   </div> : ""}
               </div>
             }) */}

          <SubSidebarItem href="/admin" label="Dashboard" icon={<SpaceDashboard />} />
          <SidebarItem label="Teacher Management" icon={<School />}>
            <SubSidebarItem href="/admin/teacher" label="Teachers" icon={undefined} />
          </SidebarItem>
          <SidebarItem label="Student Management" icon={<Person />} >
            <SubSidebarItem href="/admin/student" label="Students" icon={undefined} />
          </SidebarItem>
          <SidebarItem label="Class Management" icon={<CastForEducation />} >
            <SubSidebarItem href="/admin/class" label="Classes" icon={undefined} />
            <SubSidebarItem href="/admin/section" label="Sections" icon={undefined} />
            <SubSidebarItem href="/admin/subject" label="Subjects" icon={undefined} />
          </SidebarItem>

          <SidebarItem label="Exam Management" icon={<Create />} >
            <SubSidebarItem href="/admin/assignment" label="Assignments" icon={undefined} />
          </SidebarItem>
        </div>

        <div className='flex items-center justify-between w-full bg-white border overflow-hidden'>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar >{user.name ? user.name[0] : ''}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user?.name}
              className="font-semibold uppercase"
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ display: 'inline' }}
                >{user?.email}
                </Typography>
              }
            />
          </ListItem>
        </div>
      </div>
      {/* Main */}
      <div className='flex flex-col m-0 min-h-screen flex-1 overflow-y-auto'>
        {/* nav bar  */}
        <AppBar className="print p-2" position="sticky" sx={{ height: 80, display: 'flex', justifyContent: 'center' }} elevation={0} color='transparent'>
          <Toolbar className="print">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="print"
              onClick={() => setShowMenu(!showMenu)}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, }}

            >
              <MenuIcon
                className="print" />
            </IconButton>

            <Search className="print">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>



              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box className="print" sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                className="print"
              >
                <MoreIcon
                  className="print" />
              </IconButton>
            </Box>

          </Toolbar>

          {renderMobileMenu}
          {renderMenu}
        </AppBar>
        {/* nav bar end */}
        {/* Actual Page */}
        <div className="flex-grow overflow-y-hidden w-full bg-[#F5F5F5] ">{children}</div>

        {/* Actual Page */}
      </div>
      {/* New Evaluator Modal */}
      {/* <input type="checkbox" id="newevaluator_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiPlusCircle className="mr-1" /> New Evaluator</h3>
          <p className="flex items-center py-4"><FiType className='mr-2' />Title</p>
          <input className="input input-bordered w-full" placeholder="What's the name of the exam / evaluator?" type="text" onChange={(x) => setNewEvaluatorTitle(x.target.value)} value={newEvaluatorTitle} />
          <p className="flex items-center py-4"><FiUsers className='mr-2' />Class</p>
          {classes?.length === 0 ? <div role="alert" className="alert shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h3 className="font-bold">No Classes!</h3>
              <div className="text-xs">You need to create a class to proceed.</div>
            </div>
            <label htmlFor="newevaluator_modal" onClick={() => { newClassModalRef.current.click(); }} className="btn btn-primary btn-sm">Create Class</label>
          </div> : <select className="select select-bordered w-full" value={newEvaluatorClassId} onChange={(x) => setNewEvaluatorClassId(x.target.value)}>
            <option disabled value={"-1"}>Select class</option>
            {
              classes?.map((class_: any, i: any) => (
                <option key={i} value={class_._id}>{class_?.subject} | {class_?.name} {class_?.section}</option>
              ))
            }
          </select>}
          <p className="flex items-center py-4"><FiFileText className='mr-2' />Upload question paper(s)</p>
          {newEvaluatorQuestionPapers.length > 0 ?
            <div className="flex flex-wrap">{
              newEvaluatorQuestionPapers.map((file: string, i: number) => {
                return <img key={i} src={file} className="border cursor-pointer w-20 h-20 object-cover rounded-md mr-2 mb-2" onClick={() => window.open(file)} />
              })
            }</div>
            : <div className="flex">
              <UploadButton
                endpoint="media"
                onBeforeUploadBegin={async (files) => {
                  var pdfFiles = files.filter((file) => file.type === "application/pdf");
                  var otherFiles = files.filter((file) => file.type !== "application/pdf");

                  if (pdfFiles.length === 0) return files;

                  for (const file of pdfFiles) {
                    const images = await convertPDFToImage(file);
                    otherFiles.push(...images);
                  }

                  return otherFiles;
                }}
                onClientUploadComplete={(res) => {
                  var files = [];
                  for (const file of res) {
                    files.push(file.url);
                  }
                  setNewEvaluatorQuestionPapers([...files]);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>}
          <p className="flex items-center py-4"><FiKey className='mr-2' />Upload answer key / criteria</p>
          {newEvaluatorAnswerKeys.length > 0 ?
            <div className="flex flex-wrap">{
              newEvaluatorAnswerKeys.map((file: string, i: number) => {
                return <img key={i} src={file} className="border cursor-pointer w-20 h-20 object-cover rounded-md mr-2 mb-2" onClick={() => window.open(file)} />
              })
            }</div>
            : <div className="flex">
              <UploadButton
                endpoint="media"
                onBeforeUploadBegin={async (files) => {
                  var pdfFiles = files.filter((file) => file.type === "application/pdf");
                  var otherFiles = files.filter((file) => file.type !== "application/pdf");

                  if (pdfFiles.length === 0) return files;

                  for (const file of pdfFiles) {
                    const images = await convertPDFToImage(file);
                    otherFiles.push(...images);
                  }

                  return otherFiles;
                }}
                onClientUploadComplete={(res) => {
                  var files = [];
                  for (const file of res) {
                    files.push(file.url);
                  }
                  setNewEvaluatorAnswerKeys([...files]);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>}
          <div className="modal-action">
            <label htmlFor="newevaluator_modal" className="btn">Cancel</label>
            <label htmlFor="newevaluator_modal" className="btn btn-primary" onClick={() => createEvaluator()}>Create Evaluator</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="newevaluator_modal">Cancel</label>
      </div> */}
      {/* Edit Evaluator Modal */}
      {/* <input type="checkbox" id="editevaluator_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiPlusCircle className="mr-1" /> Edit Evaluator</h3>
          <p className="flex items-center py-4"><FiType className='mr-2' />Title</p>
          <input className="input input-bordered w-full" placeholder="What's the name of the exam / evaluator?" type="text" onChange={(x) => setEditEvaluatorTitle(x.target.value)} value={editEvaluatorTitle} />
          <p className="flex items-center py-4"><FiUsers className='mr-2' />Class</p>
          <select className="select select-bordered w-full" value={editEvaluatorClassId} onChange={(x) => setEditEvaluatorClassId(x.target.value)}>
            <option disabled value={"-1"}>Select class</option>
            {
              classes?.map((class_: any, i: any) => (
                <option key={i} value={class_._id}>{class_?.subject} | {class_?.name} {class_?.section}</option>
              ))
            }
          </select>
          <div className="modal-action">
            <label htmlFor="editevaluator_modal" className="btn">Cancel</label>
            <label htmlFor="editevaluator_modal" className="btn btn-primary" onClick={() => editEvaluator()}>Save</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="editevaluator_modal">Cancel</label>
      </div> */}
      {/* Delete Evaluator Modal */}
      {/* <input type="checkbox" id="deleteevaluator_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiTrash className="mr-1" /> Delete Evaluator</h3>
          <p className="py-4">Are you sure want to delete this evaluator?</p>
          <div className="modal-action">
            <label htmlFor="deleteevaluator_modal" className="btn">Cancel</label>
            <label htmlFor="deleteevaluator_modal" className="btn btn-error" onClick={() => deleteEvaluator()}>Delete</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="deleteevaluator_modal">Cancel</label>
      </div> */}
      {/* Evaluator Limit Exceed Modal */}
      {/* <input type="checkbox" id="limitexceed_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiInfo className="mr-1" /> Evaluator limit exceeded</h3>
          <p className="py-4">You have reached the maximum limit of evaluators.<br />You can shop for more evaluators or delete existing ones to create new ones.</p>
          <div className="modal-action">
            <label htmlFor="limitexceed_modal" className="btn">Cancel</label>
            <label htmlFor="limitexceed_modal" className="btn btn-primary" onClick={() => window.location.href = "/shop"}><FiShoppingCart /> Shop</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="limitexceed_modal">Cancel</label>
      </div> */}
      {/* New Class Modal */}
      {/* <input type="checkbox" id="newclass_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiPlusCircle className="mr-1" /> New Class</h3>
          <p className="flex items-center py-4"><FiType className='mr-2' />Class Name</p>
          <input className="input input-bordered w-full" placeholder="Class Name" type="text" onChange={(x) => setNewClassName(x.target.value)} value={newClassName} />
          <p className="flex items-center py-4"><FiUsers className='mr-2' />Section</p>
          <input className="input input-bordered w-full" placeholder="Section" type="text" onChange={(x) => setNewClassSection(x.target.value)} value={newClassSection} />
          <p className="flex items-center py-4"><FiBook className='mr-2' />Subject</p>
          <input className="input input-bordered w-full" placeholder="Subject" type="text" onChange={(x) => setNewClassSubject(x.target.value)} value={newClassSubject} />
          <div className="modal-action">
            <label htmlFor="newclass_modal" className="btn">Cancel</label>
            <label htmlFor="newclass_modal" className="btn btn-primary" onClick={() => createClass()}>Create Class</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="newclass_modal">Cancel</label>
      </div> */}
      {/* Delete Class Modal */}
      {/* <input type="checkbox" id="deleteclass_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiTrash className="mr-1" /> Delete Class</h3>
          <p className="py-4">Are you sure want to delete this class?</p>
          <div className="modal-action">
            <label htmlFor="deleteclass_modal" className="btn">Cancel</label>
            <label htmlFor="deleteclass_modal" className="btn btn-error" onClick={() => deleteClass()}>Delete</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="deleteclass_modal">Cancel</label>
      </div> */}
      {/* Edit Class Modal */}
      {/* <input type="checkbox" id="editclass_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg"><FiEdit className="mr-1" /> Edit Class</h3>
          <p className="flex items-center py-4"><FiType className='mr-2' />Class Name</p>
          <input className="input input-bordered w-full" placeholder="Class Name" type="text" onChange={(x) => setEditClassName(x.target.value)} value={editClassName} />
          <p className="flex items-center py-4"><FiUsers className='mr-2' />Section</p>
          <input className="input input-bordered w-full" placeholder="Section" type="text" onChange={(x) => setEditClassSection(x.target.value)} value={editClassSection} />
          <p className="flex items-center py-4"><FiBook className='mr-2' />Subject</p>
          <input className="input input-bordered w-full" placeholder="Subject" type="text" onChange={(x) => setEditClassSubject(x.target.value)} value={editClassSubject} />
          <div className="modal-action">
            <label htmlFor="editclass_modal" className="btn">Cancel</label>
            <label htmlFor="editclass_modal" className="btn btn-primary" onClick={() => editClass()}>Save</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="editclass_modal">Cancel</label>
      </div> */}
    </main >
  );
}
