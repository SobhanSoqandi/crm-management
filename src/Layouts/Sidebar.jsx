import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavLink } from '../components/UI/CustomNavlink';
import { FaGripLinesVertical } from 'react-icons/fa';

function Sidebar({ isOpen, onClose, menuItems, title }) {
    const sideBar = useRef();
    const [isCollapsed, setIsCollapsed] = useState(false);

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
            {/* دکمه Collapse/Expand */}
              <button
                        onClick={() => setIsCollapsed(prev => !prev)}
                        className="bg-blue-100 w-3 h-16
                         rounded-r-lg
                         my-auto
                         absolute left-0 top-1/2 
                         flex items-center justify-center" >
                        <FaGripLinesVertical className="text-blue-500" />
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
                    <div className="w-8 h-8 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
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
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;