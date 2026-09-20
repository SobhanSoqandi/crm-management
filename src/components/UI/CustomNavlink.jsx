import { NavLink } from "react-router-dom";

export function CustomNavLink({
  to,
  icon,
  notif,
  label,
  isCollapsed,
  onClick
}) {
  return (
    <li>
      <NavLink to={to} 
      onClick={onClick}
      >
        {({ isActive }) => (
          <div
            className={`
              relative flex items-center gap-3
              px-3 py-2.5 my-1
              rounded-lg
              transition-all duration-200
              ${
                isCollapsed ? "justify-center px-2" : ""
              }
              ${
                isActive
                  ? `
                    text-cyan-500
                    shadow-sm
                    before:absolute
                    before:right-0
                    before:top-1/2
                    before:-translate-y-1/2
                    before:w-1
                    before:h-8
                    before:bg-cyan-500
                    before:rounded-l-full
                  `
                  : "text-zinc-500 hover:bg-[#e8feff] hover:text-cyan-500"
              }
            `}
          >
            <div className="relative shrink-0">
              {icon}

              {notif && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </div>

            {!isCollapsed && (
              <span className="text-sm font-medium">
                {label}
              </span>
            )}
          </div>
        )}
      </NavLink>
    </li>
  );
}