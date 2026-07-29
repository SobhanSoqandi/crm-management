import React from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { FaRegUser, FaUserCircle } from 'react-icons/fa';
import Logo from '../components/UI/Logo';
import { LuUserRound } from 'react-icons/lu';
import { TbUserCircle } from 'react-icons/tb';
import { formatnumber } from '../Utils/ToPersianNumber';
import { GoSidebarCollapse } from 'react-icons/go';

function Header({ onToggleSidebar }) {

    const user = {
        firstName: ' سبحان ',
        lastName: 'سوقندی',
        phoneNumber: '09151540754',
        email: 'sobi@example.com',
        avatar: null,
        role: 'مدیر سیستم'
    };

    const fullName = `${user.firstName} ${user.lastName}`;


    return (
        <nav className="w-full bg-white shadow-md">


            <div className="flex justify-between items-center p-4   container mx-auto" >
                <Logo className="hidden sm:block w-[50px] md:w-[60px] lg:w-[70px] h-auto" />



                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-2">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
                            <FaRegUser className="text-xl text-blue-600" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-bold text-slate-700">
                                    {fullName}
                                </h2>

                                <span className=" p-1 text-[8px] rounded-2xl bg-green-100 text-green-600"> فعال </span>
                            </div>

                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                <span>{user.role}</span>
                                |
                                <span>{formatnumber.digits(user.phoneNumber)}</span>
                            </div>
                        </div>
                    </div>
                </div>



                <button
                    onClick={onToggleSidebar}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <GoSidebarCollapse className="text-3xl text-zinc-500" />
                </button>

            </div>

        </nav>
    );
}

export default Header;