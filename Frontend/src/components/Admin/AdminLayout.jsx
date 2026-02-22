import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

import { Outlet ,Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const navigate = useNavigate()
    const HomePage = () => {
        navigate("/")
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row relative">
            {/* Mobile Toggle Button */}
            <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
                <button onClick={toggleSidebar}>
                    <FaBars size={24} />
                </button>
                <h1 >E-Site</h1>
            </div>

            {/* Overlay for Mobile Sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar Container */}
            <div
                className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform transition-transform duration-300 z-20 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:static block`}
            >
                <AdminSidebar />
            </div>

            {/* Main Content Area */}
            <div className="grow p-6 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;