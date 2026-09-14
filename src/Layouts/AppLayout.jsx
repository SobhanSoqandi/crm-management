import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import {
    FaClipboardList,
    FaUserEdit,
    FaUsersCog,
} from "react-icons/fa";

import { LuWallet } from "react-icons/lu";
import { FaChartColumn, FaScissors } from "react-icons/fa6";
import { TbMessageCog } from "react-icons/tb";

import Loading from "../components/UI/Loading";
import useAuthorize from "../pages/Auth/useAuthorize";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";


function AppLayout() {
    const [isOpen, setIsOpen] = useState(false);

    const {
        isLoading: isAuthLoading,
        isAuthenticated,
    } = useAuthorize();

    const {
        user,
        isLoading: isUserLoading,
    } = useUser();

    const isLoading = isAuthLoading || isUserLoading;


    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید.");
        }
    }, [isLoading, isAuthenticated]);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-secondary-100">
                <Loading />
            </div>
        );
    }


    const role = user?.role_id;

    const sidebarConfig = [
        {
            label: "داشبورد",
            icon: <FaChartColumn className="w-6 h-6" />,
            path: "/panel/dashboard",
            roles: [1],
        },
        {
            label: "پروفایل",
            icon: <FaUserEdit className="w-6 h-6" />,
            path: "/panel/profile",
            roles: [1, 2, 3],
        },
        {
            label: "نوبت ها",
            icon: <FaClipboardList className="w-6 h-6" />,
            path: "appointments",
            roles: [1, 2],
        },
        {
            label: "مدیریت مشتریان",
            icon: <FaUsersCog className="w-6 h-6" />,
            path: "/panel/customers",
            roles: [2],
        },
        {
            label: "خدمات من",
            icon: <FaScissors className="w-5 h-5" />,
            path: "/panel/services",
            roles: [2],
        },
        {
            label: "کیف پول",
            icon: <LuWallet className="w-6 h-6" />,
            path: "wallet",
            roles: [1],
        },
        {
            label: "پنل پیامکی",
            icon: <TbMessageCog className="w-6 h-6" />,
            path: "messages",
            roles: [2, 3],
        },
    ].filter((item) => item.roles.includes(role));


   
    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };


   
    const closeSidebar = () => {
        setIsOpen(false);
    };


    return (
        <div className="min-h-screen">

            
            <Header onToggleSidebar={toggleSidebar} />


            <div className="relative flex gap-4 sm:px-4 py-4">

                
                <Sidebar
                    isOpen={isOpen}
                    onClose={closeSidebar}
                    menuItems={sidebarConfig}
                />


               
                <div className="flex justify-center w-full">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}


export default AppLayout;