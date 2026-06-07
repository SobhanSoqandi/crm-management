import React, { useState } from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { BiCheckboxChecked, BiSolidCategoryAlt } from 'react-icons/bi';
import { RiDashboard3Fill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import { IoIosSwitch } from 'react-icons/io';
import Header from './Header';
import { BsWallet2 } from 'react-icons/bs';

function AppLayout() {
    const [isOpen, setIsOpen] = useState(false);

    const sidebarConfig = 
        [
        { label: "داشبورد", icon: <RiDashboard3Fill className="w-6 h-6" />, path: "/panel/complete" },
        { label: "مدیریت کاربران", icon: <FaUsers className="w-6 h-6" />, path: "/panel/customers" },
        {
            label: "  کیف پول ", icon: <BsWallet2
                className="w-6 h-6" />, path: "admin/categories"
        },
        { label: " ویژگی ها ", icon: <IoIosSwitch className="w-6 h-6" />, path: "admin/attributes" },

        ]
    

    const toggleSidebar = () => {
            setIsOpen(!isOpen);
        };

        return(
        <div className="min-h-screen" >
            <Header onToggleSidebar={toggleSidebar} />

            <div className="relative flex gap-4 sm:px-4 py-4">
                <Sidebar 
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    menuItems={sidebarConfig}
                />
                
                <div className="flex justify-center w-full">
                    <Outlet />
                </div>

                {/* {isOpen && (
                    <div 
                        className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )} */}
            </div>
        </div >
    );
}

export default AppLayout;