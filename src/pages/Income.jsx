import {useCallback, useEffect, useState} from "react";

import UseUser from "../hooks/UseUser.jsx";

import Dashboard from "../components/dashboard/Dashboard.jsx";

import {API_ENDPOINTS} from "../utils/api-endpoints.js";
import AxiosConfig from "../utils/AxiosConfig.jsx";

import toast from "react-hot-toast";
import IncomeList from "../components/income/IncomeList.jsx";

const Income = () => {
  UseUser();

  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const [openEditIncomeModal, setOpenEditIncomeModal] = useState(false);

  const [openDeleteIncomeModal, setOpenDeleteIncomeModal] = useState({
    show: false,
    data: null,
  });

  const [incomeData, setIncomeData] = useState([]);

  const [categoryData, setCategoryData] = useState([]);

  const fetchIncomeDetails = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.INCOME.LIST);

      if (response.status === 200) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("error fetching income details:", error);

      toast.error("Failed to fetch income details. Please try again later.");

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncomeDetails().then(() => {
      console.log("Income details fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching income details:", error);
    });
  }, [fetchIncomeDetails]);

  return (
    <Dashboard activeMenu="Incomes">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line char */}
          </div>

          <IncomeList
            incomes={incomeData}
            onDeleteIncome={(incomeId) => {
              console.log("Delete income" + incomeId);
            }}

            onEditIncome={() => {
            }}
          />
        </div>
      </div>
    </Dashboard>
  );
}

export default Income;