import {useCallback, useEffect, useState} from "react";

import UseUser from "../hooks/UseUser.jsx";

import Model from "../components/global/Model.jsx";
import IncomeList from "../components/income/IncomeList.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";
import DeleteAlert from "../components/global/DeleteAlert.jsx";
import AddIncomeForm from "../components/income/AddIncomeForm.jsx";

import AxiosConfig from "../utils/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/api-endpoints.js";

import {Plus} from "lucide-react";
import toast from "react-hot-toast";

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

  const [incomeCategoriesData, setIncomeCategoriesData] = useState([]);

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

  const fetchIncomeCategories = useCallback(async () => {
    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.CATEGORY.LIST_BY_TYPE("income"));

      if (response.status === 200) {
        setIncomeCategoriesData(response.data);
      }
    } catch (error) {
      console.error("error fetching income categories details:", error);

      toast.error("Failed to fetch income categories details. Please try again later.");
    }
  }, []);

  const handleAddIncome = async (income) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.INCOME.CREATE, income);

      if (response.status === 201) {
        toast.success("Income added successfully.");

        fetchIncomeDetails().then(() => {
          console.log("Income details fetched successfully after adding income.");
        }).catch((error) => {
          console.error("Error fetching income details after adding income:", error);
        });

        setOpenAddIncomeModal(false);
      }
    } catch (error) {
      console.error("Error adding income:", error);

      toast.error("Failed to add income. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteIncome = (incomeId) => {
    setOpenDeleteIncomeModal({
      show: true,
      data: incomeId,
    });
  }

  const handleConfirmDeleteIncome = async (incomeId) => {
    if (loading) return;

    setLoading(true);

    console.log("Deleting income with ID:", incomeId);

    try {
      const response = await AxiosConfig.delete(API_ENDPOINTS.INCOME.DELETE(incomeId));

      if (response.status === 204) {
        toast.success("Income deleted successfully.");

        fetchIncomeDetails().then(() => {
          console.log("Income details fetched successfully after deleting income.");
        }).catch((error) => {
          console.error("Error fetching income details after deleting income:", error);
        });
      }
    } catch (error) {
      console.error("Error deleting income:", error);

      toast.error("Failed to delete income. Please try again later.");
    } finally {
      setLoading(false);

      setOpenDeleteIncomeModal({
        show: false,
        data: null,
      });
    }
  }

  useEffect(() => {
    fetchIncomeDetails().then(() => {
      console.log("Income details fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching income details:", error);
    });

    fetchIncomeCategories().then(() => {
      console.log("Income categories details fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching income categories details:", error);
    });
  }, [fetchIncomeDetails, fetchIncomeCategories]);

  return (
    <Dashboard activeMenu="Incomes">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Incomes</h2>

          <button
            className="flex items-center mt-1 gap-2 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 active:bg-blue-700 transition"
            onClick={() => setOpenAddIncomeModal(true)}
          >
            <Plus size={15} />
            Add Income
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line char */}
          </div>

          <IncomeList
            incomes={incomeData}
            onDeleteIncome={handleDeleteIncome}
            onEditIncome={(incomeId) => {
              console.log("Edit income: " + incomeId);
            }}
          />

          {openAddIncomeModal && (
            <Model
              title="Add Income"
              isOpen={openAddIncomeModal}
              onClose={() => setOpenAddIncomeModal(false)}
            >
              <AddIncomeForm incomeCategoriesData={incomeCategoriesData} onAddIncome={handleAddIncome} />
            </Model>
          )}

          {openDeleteIncomeModal.show && (
            <Model
              title="Delete Income"
              isOpen={openDeleteIncomeModal.show}
              onClose={() => setOpenDeleteIncomeModal({ show: false, data: null })}
            >
              <DeleteAlert
                message="Are you sure you want to delete this income?"
                cancelHandler={() => setOpenDeleteIncomeModal({ show: false, data: null })}
                deleteHandler={() => handleConfirmDeleteIncome(openDeleteIncomeModal.data)}
              />
            </Model>
          )}
        </div>
      </div>
    </Dashboard>
  );
}

export default Income;