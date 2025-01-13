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

import {ListItem,ListItemAvatar,ListItemText} from "@mui/material";
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

          
          <SubSidebarItem href="/student" label="Dashboard" icon={<SpaceDashboard />} />       
          <SidebarItem label="My Classes" icon={<CastForEducation />} >
            <SubSidebarItem href="/student/class" label="Classes" icon={undefined} />
          </SidebarItem>
          <SidebarItem label="My Assignments" icon={<Create />} >
            <SubSidebarItem href="/student/assignment" label="Assignments" icon={undefined} />
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
        </main >
  );
}
