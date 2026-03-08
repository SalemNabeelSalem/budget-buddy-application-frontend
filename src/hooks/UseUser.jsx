import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import axiosConfig from "../utils/AxiosConfig.jsx";
import {AppContext} from "../contexts/AppContext.jsx";
import {API_ENDPOINTS} from "../utils/api-endpoints.js";

const UseUser = () => {
  const {user, setUser, clearUser} = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.auth.me);

        if (isMounted && response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("error fetching user data:", error);

        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    }

    fetchUserInfo().catch(error => {
      console.error("error in fetchUserInfo:", error);
    });

    return () => {
      isMounted = false;
    }
  }, [user, setUser, clearUser, navigate]);
}

export default UseUser;