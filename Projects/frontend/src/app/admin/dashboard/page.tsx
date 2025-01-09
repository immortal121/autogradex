"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverURL } from "@/utils/utils";
import {HomeOutlined} from '@mui/icons-material';
export default function Page() {
    const adminPath = "/admin";
    type DashboardData = {
        earnings: number;
        purchases: number;
        items: number;
        users: number;
    }

    const [data, setData] = useState<DashboardData | null>();

    const getData = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/admin/dashboard`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        axios(config)
            .then((response) => {
                setData(response.data);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center mb-5'><HomeOutlined className='mr-2' /> Admin Dashboard</p>
    </div>
}