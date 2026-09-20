
import React from 'react';
import { FaBars, FaUserEdit } from 'react-icons/fa';
import Logo from '../components/UI/Logo';
import { formatnumber } from '../Utils/ToPersianNumber';
import Loading from '../components/UI/Loading';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import useSalon from '../hooks/useSalon';
import useCustomer from '../hooks/useCustomer';

function Header({ onToggleSidebar }) {

    const { user, isLoading } = useUser();

    const { isSalonLoading, salon } = useSalon();

    const { isCustomerLoading, customer } = useCustomer();

    const roleId = Number(user?.role_id);

    const isCustomer = roleId === 1;
    const isSalon = roleId === 2;

    const customerFullName = [
        customer?.first_name,
        customer?.last_name
    ]
        .filter(Boolean)
        .join(' ');

    const displayName = isCustomer
        ? customerFullName || 'پروفایل خود را تکمیل کنید'
        : isSalon
            ? salon?.data?.name || 'نامشخص'
            : 'نامشخص';

    if (
        isLoading ||
        (isSalon && isSalonLoading) ||
        (isCustomer && isCustomerLoading) ||
        !user
    ) {
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

                <Logo className="block w-[50px] md:w-[60px] lg:w-[70px] h-auto" />

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-2">

                    <div className="flex items-center gap-2">

                        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[#d9feff]">
                            <Link
                                to="/panel/profile"
                                className="text-cyan-500 text-xl"
                            >
                                <FaUserEdit />
                            </Link>
                        </div>

                        <div>

                            <div className="flex items-center gap-2">
                                <h2 className="text-sm sm:font-bold text-slate-700">
                                    {displayName}
                                </h2>
                            </div>

                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                <span>
                                    {user.user_name ?? "نامشخص"}
                                </span>

                                |

                                <span>
                                    {formatnumber.digits(user.phone)}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                <button
                    onClick={onToggleSidebar}
                    className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
                >
                    <FaBars className="text-2xl text-gold" />
                </button>

            </div>

        </nav>
    );
}

export default Header;
