import React from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

function Header({ onToggleSidebar }) {
   
    const user = {
        firstName: ' سبحان ',
        lastName: 'سوقندی',
        phoneNumber: '42071555190',
        email: 'sobi@example.com',
        avatar: null, 
        role: 'مدیر سیستم'
    };

    const fullName = `${user.firstName} ${user.lastName}`;

    const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        return `${phone.slice(0, 4)}****${phone.slice(-4)}`;
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">

            <div className="text-lg font-bold text-blue-600">
                پنل مدیریت
            </div>

            
            

            <div className="flex items-center gap-3">
                <div className="relative">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={fullName}
                            className="w-11 h-11 rounded-full object-cover shadow-md border-2 border-white"
                        />
                    ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center shadow-md">
                            <FaUserCircle className="w-6 h-6 text-indigo-500" />
                        </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-0.5">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl px-4 py-2 shadow-sm">
                    <div className="font-bold text-gray-800 text-sm flex items-center gap-1">
                        {fullName}
                        <span className="text-[10px] font-normal bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">فعال</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                        <span className="font-medium text-indigo-600">{user.role}</span>
                        <span className="text-gray-300">|</span>
                        <span className="dir-ltr text-[11px]">{formatPhoneNumber(user.phoneNumber)}</span>
                    </div>
                </div>
            </div>



<button
                onClick={onToggleSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <FiAlignRight className="text-3xl" />
            </button>


        </nav>
    );
}

export default Header;