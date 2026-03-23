import {useCallback, useEffect, useState} from "react";

import UseUser from "../hooks/UseUser.jsx";

import Model from "../components/global/Model.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";
import DeleteAlert from "../components/global/DeleteAlert.jsx";
import ExpenseList from "../components/expense/ExpenseList.jsx";
import AddExpenseForm from "../components/expense/AddExpenseForm.jsx";
import ExpenseOverview from "../components/expense/ExpenseOverview.jsx";

import AxiosConfig from "../utils/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/api-endpoints.js";

import {Plus} from "lucide-react";
import toast from "react-hot-toast";

const Expense = () => {
  UseUser();

  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const [openEditExpenseModal, setOpenEditExpenseModal] = useState(false);

  const [openDeleteExpenseModal, setOpenDeleteExpenseModal] = useState({
    show: false,
    data: null,
  });

  const [expenseData, setExpenseData] = useState([]);

  const [expenseCategoriesData, setExpenseCategoriesData] = useState([]);

  const [selectedExpense, setSelectedExpense] = useState(null);

  const fetchExpenseDetails = useCallback(async () => {
    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.EXPENSE.LIST);

      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("error fetching expense details:", error);

      toast.error("Failed to fetch expense details. Please try again later.");
    }
  }, []);

  const fetchExpenseCategories = useCallback(async () => {
    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.CATEGORY.LIST_BY_TYPE("expense"));

      if (response.status === 200) {
        setExpenseCategoriesData(response.data);
      }
    } catch (error) {
      console.error("error fetching expense categories details:", error);

      toast.error("Failed to fetch expense categories details. Please try again later.");
    }
  }, []);

  const handleAddExpense = async (expense) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.EXPENSE.CREATE, expense);

      if (response.status === 201) {
        toast.success("Expense added successfully.");

        fetchExpenseDetails().then(() => {
          console.log("Expense details fetched successfully after adding expense.");
        }).catch((error) => {
          console.error("Error fetching expense details after adding expense:", error);
        });

        setOpenAddExpenseModal(false);
      }
    } catch (error) {
      console.error("Error adding expense:", error);

      toast.error("Failed to add expense. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setOpenEditExpenseModal(true);
  }

  const handleUpdateExpense = async (updatedExpense) => {
    if (loading) return;

    setLoading(true);

    const existingExpense = expenseData.find(
      (exp) => exp.name.toLowerCase() === updatedExpense.name.toLowerCase() && exp.id !== updatedExpense.id
    );

    if (existingExpense) {
      toast.error("An expense with the same name already exists. Please choose a different name.");
      setLoading(false);
      return;
    }

    try {
      const response = await AxiosConfig.put(API_ENDPOINTS.EXPENSE.UPDATE(updatedExpense.id), updatedExpense);

      if (response.status === 200) {
        toast.success("Expense updated successfully.");

        setOpenEditExpenseModal(false);

        setSelectedExpense(null);

        fetchExpenseDetails().then(() => {
          console.log("Expense details fetched successfully after updating expense.");
        }).catch((error) => {
          console.error("Error fetching expense details after updating expense:", error);
        });
      }
    } catch (error) {
      console.error("Error updating expense:", error);

      toast.error("Failed to update expense. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteExpense = (expenseId) => {
    setOpenDeleteExpenseModal({
      show: true,
      data: expenseId,
    });
  }

  const handleConfirmDeleteExpense = async (expenseId) => {
    if (loading) return;

    setLoading(true);

    console.log("Deleting expense with ID:", expenseId);

    try {
      const response = await AxiosConfig.delete(API_ENDPOINTS.EXPENSE.DELETE(expenseId));

      if (response.status === 204) {
        toast.success("Expense deleted successfully.");

        fetchExpenseDetails().then(() => {
          console.log("Expense details fetched successfully after deleting expense.");
        }).catch((error) => {
          console.error("Error fetching expense details after deleting expense:", error);
        });
      }
    } catch (error) {
      console.error("Error deleting expense:", error);

      toast.error("Failed to delete expense. Please try again later.");
    } finally {
      setLoading(false);

      setOpenDeleteExpenseModal({
        show: false,
        data: null,
      });
    }
  }

  const handleDownloadExpenseReport = async () => {
    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.EXCEL.EXPENSE, {
        responseType: "blob",
      });

      let fileName = "expense-report.xlsx";

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", fileName);

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Expenses report downloaded successfully.");
    } catch (error) {
      console.error("Error downloading expense report:", error);
      toast.error("Failed to download expense report. Please try again later.");
    }
  };

  const handleEmailExpenseReport = async () => {
    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.EMAIL.EXPENSE);

      if (response.status === 200) {
        toast.success("Expenses report emailed successfully.");
      } else {
        toast.error("Failed to email expense report. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting expense report:", error);
      toast.error("Failed to email expense report. Please try again later.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails().then(() => {
      console.log("Expense details fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching expense details:", error);
    });

    fetchExpenseCategories().then(() => {
      console.log("Expense categories details fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching expense categories details:", error);
    });
  }, [fetchExpenseDetails, fetchExpenseCategories]);

  return (
    <Dashboard activeMenu="Expenses">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Expenses</h2>

          <button
            className="flex items-center mt-1 gap-2 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 active:bg-blue-700 transition"
            onClick={() => setOpenAddExpenseModal(true)}
          >
            <Plus size={15} />
            Add Expense
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview transactions={expenseData} />
          </div>

          <ExpenseList
            expenses={expenseData}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
            onDownloadExpense={handleDownloadExpenseReport}
            onEmailExpense={handleEmailExpenseReport}
          />

          {openAddExpenseModal && (
            <Model
              title="Add Expense"
              isOpen={openAddExpenseModal}
              onClose={() => setOpenAddExpenseModal(false)}
            >
              <AddExpenseForm expenseCategoriesData={expenseCategoriesData} onAddExpense={handleAddExpense} />
            </Model>
          )}

          {openDeleteExpenseModal.show && (
            <Model
              title="Delete Expense"
              isOpen={openDeleteExpenseModal.show}
              onClose={() => setOpenDeleteExpenseModal({ show: false, data: null })}
            >
              <DeleteAlert
                message="Are you sure you want to delete this expense?"
                cancelHandler={() => setOpenDeleteExpenseModal({ show: false, data: null })}
                deleteHandler={() => handleConfirmDeleteExpense(openDeleteExpenseModal.data)}
              />
            </Model>
          )}

          {openEditExpenseModal && (
            <Model
              title="Edit Expense"
              isOpen={openEditExpenseModal}
              onClose={() => {
                setOpenEditExpenseModal(false);
                setSelectedExpense(null);
              }}
            >
              <AddExpenseForm
                onAddExpense={handleUpdateExpense}
                expenseCategoriesData={expenseCategoriesData}
                initialExpenseData={{...selectedExpense}}
                isEditing={true}
              />
            </Model>
          )}
        </div>
      </div>
    </Dashboard>
  );
}

export default Expense;