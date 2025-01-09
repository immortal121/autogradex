// SidebarItem.js

import React, { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

const SidebarItem = ({ label, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-0 w-full overflow-hidden hover:overflow-y-auto dropdown dropdown-top">
      <label
        tabIndex={0}
        className={`btn w-full justify-between normal-case flex items-center ${!isOpen ? 'btn-ghost' : ''}`}
        onClick={handleClick}
      >
        <span>
        {icon && <span className="mr-2">{icon}</span>} 
        {label}</span>
        <span className="ml-1">{isOpen ? <FiChevronDown /> : <FiChevronRight />}</span> 
      </label>
      {isOpen && (
        <ul tabIndex={0} className="p-0 ml-2 w-full overflow-hidden hover:overflow-y-auto ">
          {children}
        </ul>
      )}
    </div>
  );
};

const SubSidebarItem = ({ href, label, icon}) => {
  return (
    <Link href={href}>
      <label className='btn w-full mt-2 justify-start normal-case'>
        {icon && <span className="mr-2">{icon}</span>} 
        {label}
      </label>
    </Link>
  );
};

export { SidebarItem, SubSidebarItem };