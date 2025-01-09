"use client";
import { appName } from "@/utils/utils";
import AdminDashboard from "@/utils/Dashboard";
import React from "react";

export default function Home() {
    return (
        <div className='select-none flex flex-col items-center p-4 w-full h-full overflow-x-auto'>
            <AdminDashboard />
        </div>
    )
}
