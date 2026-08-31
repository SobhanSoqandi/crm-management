import React from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { FaBars, FaRegUser, FaUserCircle, FaUserEdit } from 'react-icons/fa';
import Logo from '../components/UI/Logo';
import { LuUserRound } from 'react-icons/lu';
import { TbUserCircle } from 'react-icons/tb';
import { formatnumber } from '../Utils/ToPersianNumber';
import { GoSidebarCollapse } from 'react-icons/go';
import useUser from '../hooks/useUser';
import Loading from '../components/UI/Loading';
import { Link } from 'react-router-dom';
import useSalon from '../hooks/useSalon';
import useCustomer from '../hooks/useCustomer';

function Header({ onToggleSidebar }) {

    const { user, isLoading } = useUser();

    const { isSalonLoading, salon } = useSalon();

    // const { isCustomerLoading, customer } = useCustomer();

    // const fullName =
    //     customer?.first_name && customer?.last_name
    //         ? `${customer.first_name} ${customer.last_name}`
    //         : "پروفایل خود را تکمیل کنید";


    if (isLoading || isSalonLoading || !user) {
        return (
            <nav className="w-full bg-white shadow-md">
                <div className="flex justify-between items-center p-4 container mx-auto">
                    <Logo className="hidden sm:block w-[50px] md:w-[60px] lg:w-[70px] h-auto" />
                    <Loading />
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaBars className="text-2xl text-zinc-600" />
                    </button>
                </div>
            </nav>
        );
    }


    return (
        <nav className="w-full bg-white shadow-md">

            <div className="flex justify-between items-center p-4 container mx-auto">
                <Logo className="hidden sm:block w-[50px] md:w-[60px] lg:w-[70px] h-auto" />

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-2">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F6E9B2]
                        ">
                            <Link
                                to="/panel/profile"
                                className="text-[#e3aa00] text-2xl "
                            >
                                <FaUserEdit />

                            </Link>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm sm:text-sm sm:font-bold text-slate-700">
                                    {salon?.data?.name}
                                </h2>

                                <span className=" p-1 text-[8px] rounded-2xl bg-green-100 text-green-600"> فعال </span>
                            </div>

                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                <span>{user.user_name ?? "نامشخص"}</span>
                                |
                                <span>{formatnumber.digits(user.phone)}</span>
                            </div>
                        </div>

                    </div>
                </div>

                <button
                    onClick={onToggleSidebar}
                    className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                    <FaBars className="text-2xl text-[#0a6847]" />
                </button>

            </div>

        </nav>
    );
}

export default Header;
