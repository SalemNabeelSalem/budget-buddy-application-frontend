import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import Sidebar from "./Sidebar.jsx";
import images from "../../assets/images.js";
import {AppContext} from "../../contexts/AppContext.jsx";

import {LogOut, Menu, User, X} from "lucide-react";

const MenuBar = ({activeMenu}) => {
  // state to control the visibility of the mobile side menu.
  const [openSideMenu, setOpenSideMenu] = useState(false);

  // state to control the visibility of the user dropdown menu.
  const [showDropdown, setShowDropdown] = useState(false);

  // ref to the dropdown menu for handling outside clicks (if needed).
  const dropdownRef = useRef(null);

  // useNavigate hook from react-router-dom to programmatically navigate after logout.
  const navigate = useNavigate();

  // access user data and the function to clear user data from the AppContext.
  const {user, clearUser} = useContext(AppContext);

  /*
   * handleLogout function is called when the user clicks the logout button in the dropdown menu.
  */
  const handleLogout = () => {
    localStorage.removeItem("token");

    clearUser();

    setShowDropdown(false);

    navigate("/login");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 sm:px-7 sticky top-0 z-30">
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
          onClick={() => setOpenSideMenu(!openSideMenu)}>
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu  className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <img
            src={String(images.logo)}
            alt="Logo"
            className="w-10 h-10"
          />

          <span className="text-lg font-medium text-black truncate">
            Budget Buddy
          </span>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2"
        >
          <User className="text-purple-500"/>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                  <User className="w-4 h-4 text-purple-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user?.fullName || "User Name"}
                  </p>

                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "User Email"}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => handleLogout()}
              >
                <LogOut className="w-4 h-4 text-gray-500" />

                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {openSideMenu && (
        <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-18.25">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
}

export default MenuBar;