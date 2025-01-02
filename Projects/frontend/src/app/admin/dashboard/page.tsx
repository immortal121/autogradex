"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { currencySymbol, serverURL } from "@/utils/utils";
import { FiCreditCard, FiDollarSign, FiHome, FiShoppingCart, FiUsers } from 'react-icons/fi';
import { Breadcrumbs } from '@mui/material';

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
        <Breadcrumbs separator=">" maxItems={2} aria-label="breadcrumb">
            <Link href="#">
                Dashboard
            </Link>
        </Breadcrumbs>
        <p className='font-semibold text-xl flex items-center mb-5'><FiHome className='mr-2' /> Admin Dashboard</p>

    </div>
}