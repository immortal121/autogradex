"use client";
import axios from "axios";
import Link from 'next/link';
import { toast } from 'react-toastify';
import { serverURL } from '../../../utils/utils';
import { FiUser, FiUsers } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { Stack } from '@mui/material';

export default function Page() {
    // const [users, setUsers] = useState([]);

    // const getUsers = async () => {
    //     const config = {
    //         method: "GET",
    //         url: `${serverURL}/admin/users`,
    //         headers: {
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`
    //         },
    //     };

    //     axios(config)
    //         .then((response) => {
    //             setUsers(response.data);
    //         })
    //         .catch((error) => {
    //             toast.error("Something went wrong!");
    //         });
    // }

    // useEffect(() => {
    //     getUsers();
    // }, []);

    // 
    const rows: GridRowsProp = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
      ];
      
      const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Column 1', width: 150 },
        { field: 'col2', headerName: 'Column 2', width: 150 },
      ];
      
  


    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center mb-5'><FiUsers className='mr-2' /> Users</p>
        {/* <div className="overflow-x-auto">
            
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Evaluator Limit</th>
                        <th>Evaluation Limit</th>
                        <th>Purchases</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user: any, index: number) => {
                            return <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar placeholder mr-2">
                                            <div className="bg-blue-700 text-white mask mask-squircle w-10">
                                                <span><FiUser /></span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <Link href={`mailto:${user?.email}`} target='_blank' className='underline'>{user?.email}</Link>
                                </td>
                                <td>{user?.limits?.evaluatorLimit}</td>
                                <td>{user?.limits?.evaluationLimit}</td>
                                <td>{user?.purchases}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div> */}
        <Stack spacing={2}>
      
       <DataGrid  rows={rows} columns={columns} slots={{ toolbar: GridToolbar }}
        
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector

        

        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}  />
    </Stack>
    </div>
}