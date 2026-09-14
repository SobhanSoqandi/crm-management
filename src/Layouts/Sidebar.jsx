import React, { useRef, useEffect, useState } from "react";
import { CustomNavLink } from "../components/UI/CustomNavlink";
import { FaGripLinesVertical } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { BiLogOut } from "react-icons/bi";
import useMutationData from "../services/useMutationData";

function Sidebar({ isOpen, onClose, menuItems, title }) {
    const sideBar = useRef();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { mutate: logout, isPending } = useMutationData(
        "auth/logout",
        "POST",
        "logout-toast",
        {
            onSuccess: () => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
            },
        }
    );

    const handleLogout = () => {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
            return;
        }

        logout({ refresh_token: refreshToken });
    };

    useEffect(() => {
        if (!sideBar.current) return;

        sideBar.current.style.transform = isOpen
            ? "translateX(0)"
            : "translateX(300px)";
    }, [isOpen]);

    const sidebarWidth = isCollapsed ? "w-20" : "w-64";

    return (
        <aside
            ref={sideBar}
            className={`fixed top-5 right-5 min-h-96 ${sidebarWidth} rounded-xl bg-white shadow-lg z-50 transition-all duration-300 overflow-hidden`}
            style={{ transform: "translateX(300px)" }}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute top-3 left-5 z-20 w-9 h-9 flex items-center justify-center rounded-lg text-[#daa400] hover:bg-yellow-50 active:scale-95 transition-all duration-200"
            >
                <IoClose className="text-2xl" />
            </button>

            <button
                type="button"
                onClick={() => setIsCollapsed((prev) => !prev)}
                aria-label={isCollapsed ? "باز کردن سایدبار" : "کوچک کردن سایدبار"}
                title={isCollapsed ? "باز کردن سایدبار" : "کوچک کردن سایدبار"}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-16 flex items-center justify-center rounded-r-lg bg-[#F6E9B2] hover:bg-[#f3df8d] transition-colors duration-200"
            >
                <FaGripLinesVertical className="text-[#d6a100]" />
            </button>

            <div className="p-4 pt-14">
                {title && !isCollapsed && (
                    <h2 className="text-xl font-bold mb-5 border-b pb-2 pr-10 whitespace-nowrap overflow-hidden">
                        {title}
                    </h2>
                )}

                {title && isCollapsed && (
                    <div className="w-8 h-8 mx-auto mb-5 bg-[#7ABA78] rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 font-bold text-sm">
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

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isPending}
                        className={`w-full relative flex items-center gap-3 px-3 py-2.5 my-1 rounded-lg text-gray-500 hover:bg-rose-100 hover:text-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isCollapsed ? "justify-center" : ""}`}
                    >
                        <div className="relative shrink-0">
                            <BiLogOut className="text-2xl" />
                        </div>

                        {!isCollapsed && (
                            <span className="text-sm font-medium">
                                {isPending ? "در حال خروج..." : "خروج"}
                            </span>
                        )}
                    </button>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;