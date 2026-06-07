import { NavLink } from "react-router-dom";

export function CustomNavLink({ to, icon, notif, label, isCollapsed }) {

    const baseClass = `
        relative flex items-center gap-3 
        px-3 py-2.5 my-1
        rounded-lg
        text-gray-600
        transition-all duration-200
    `;

    const activeClass = `
        bg-white
        text-indigo-600
        shadow-sm
        before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2
        before:w-1 before:h-8 before:bg-indigo-500 before:rounded-l-full
    `;

    const NotifClass = `
        absolute -top-1 -right-1
        w-2 h-2
        rounded-full
        bg-rose-500
        ring-2 ring-white
    `;

    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `${baseClass} ${isCollapsed ? "justify-center px-2" : ""}
                    ${isActive 
                        ? activeClass 
                        : "hover:bg-gray-50 hover:text-indigo-500"
                    }`
                }
            >
                <div className="relative shrink-0">
                    {icon}
                    {notif && <span className={NotifClass} />}
                </div>

                <span
                    className={`
                        text-sm font-medium
                        whitespace-nowrap
                        transition-all duration-200
                        ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"}
                    `}
                >
                    {label}
                </span>
            </NavLink>
        </li>
    );
}