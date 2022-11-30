import { NavLink } from "react-router-dom";

function Navbar() {
  const activeClassNavLink =
    "text-gray-200 bg-slate-700 px-2 py-4 text-3xl font-medium rounded-full px-10";
  const classNavLink =
    " text-gray-600 px-2 py-4 text-3xl font-medium rounded-full px-10 hover:bg-slate-700 hover:text-gray-200 transition-all duration-400";

  return (
    <nav className="bg-gray-200 border-black border-2 rounded-full p-1 flex justify-center gap-2 items-center w-fit mx-auto hover:shadow-xl hover:mt--10 shadow-md mb-10">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? activeClassNavLink : classNavLink
        }
      >
        Maker!
      </NavLink>
      <NavLink
        to="/trainer"
        className={({ isActive }) =>
          isActive ? activeClassNavLink : classNavLink
        }
      >
        Trainer!
      </NavLink>
      <NavLink
        to="/improver"
        className={({ isActive }) =>
          isActive ? activeClassNavLink : classNavLink
        }
      >
        Improve!
      </NavLink>
    </nav>
  );
}

export default Navbar;
