import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavLink } from '../components/UI/CustomNavlink';
import { FaGripLinesVertical } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import useMutationData from '../services/useMutationData';

function Sidebar({ isOpen, onClose, menuItems, title }) {
    const sideBar = useRef();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { mutate: logout, isPending } = useMutationData("auth/logout", "POST", "logout-toast",
        {
            onSuccess: () => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
            },
        });
    const handleLogout = () => {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
            return;
        }

        logout({
            refresh_token: refreshToken,
        });
    };

    useEffect(() => {
        if (sideBar.current) {
            sideBar.current.style.transform = isOpen ? 'translateX(0)' : 'translateX(300px)';
        }
    }, [isOpen]);

    const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';

    return (
        <div
            ref={sideBar}
            className={`fixed top-5 right-5 min-h-96 rounded-xl ${sidebarWidth} bg-white shadow-lg z-50 transition-all duration-300 overflow-hidden`}
            style={{ transform: 'translateX(300px)' }}
        >

            <button
                onClick={() => setIsCollapsed(prev => !prev)}
                className="bg-[#F6E9B2] w-3 h-16
                         rounded-r-lg
                         my-auto
                         absolute left-0 top-1/2 
                         flex items-center justify-center" >
                <FaGripLinesVertical className="text-[#d6a100]" />
            </button>

            <div
                onClick={onClose}
                className="p-4">
                {title && !isCollapsed && (
                    <h2 className="text-xl font-bold mb-4 border-b pb-2 whitespace-nowrap overflow-hidden">
                        {title}
                    </h2>
                )}
                {title && isCollapsed && (
                    <div className="w-8 h-8 mx-auto mb-4 bg-[#7ABA78] rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">
                            {title.charAt(0)}
                        </span>
                    </div>
                )}

                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <CustomNavLink
                            key={index}
                            to={item.path}
                            notif={item.notif || false}
                            icon={item.icon}
                            isCollapsed={isCollapsed}
                            label={item.label}
                        />
                    ))}

                    <div
                        onClick={handleLogout}
                        className={`
              relative flex items-center gap-3 text-gray-500 hover:bg-rose-100 hover:text-red-500
              px-3 py-2.5 my-1
              rounded-lg
              transition-all duration-200
              ${isCollapsed ? "justify-center" : ""
                            }
            
            `}
                    >
                        <div className="relative shrink-0">
                            <BiLogOut className="text-2xl " />
                        </div>

                        {!isCollapsed && (
                            <span className="text-sm font-medium">
                                {isPending ? "در حال خروج..." : "خروج"}
                            </span>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;