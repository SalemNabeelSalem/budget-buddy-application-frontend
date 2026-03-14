import {useContext} from "react";

import MenuBar from "./MenuBar.jsx";
import Sidebar from "./Sidebar.jsx";

import {AppContext} from "../../contexts/AppContext.jsx";

const Dashboard = ({children, activeMenu}) => {
  const {user} = useContext(AppContext);

  return (
    <div className="dashboard">
      <MenuBar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <Sidebar activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;