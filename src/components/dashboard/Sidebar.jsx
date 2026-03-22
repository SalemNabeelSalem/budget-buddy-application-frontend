import {useContext} from "react";
import {useNavigate} from "react-router-dom";

import {SIDEBAR_DATA} from "../../assets/sidebar.js";
import {AppContext} from "../../contexts/AppContext.jsx";

import {User} from "lucide-react";

const Sidebar = ({activeMenu}) => {
  const {user} = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-15.25 z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl ?? "https://placehold.co/80x80?text=Profile+Image"}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <User className="w-20 h-20" />
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || "User Name"}
        </h5>
      </div>

      {SIDEBAR_DATA.map((item) => {
        const Icon = item.icon;

        return (
          <button
            onClick={() => navigate(item.link)}
            key={`menu_${item.id}`}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer ${activeMenu === item.title ? "text-white bg-purple-800" : ""}`}
          >
            <Icon className="text-xl" />
            {item.title}
          </button>
        );
      })}
    </div>
  );
}

export default Sidebar;