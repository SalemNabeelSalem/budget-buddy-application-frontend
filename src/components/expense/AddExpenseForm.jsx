import {useEffect, useState} from "react";

import Input from "../global/Input.jsx";
import EmojiPickerPopup from "../global/EmojiPickerPopup.jsx";

import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";

const AddExpenseForm = ({ expenseCategoriesData, onAddExpense, initialExpenseData, isEditing }) => {

  const [loading, setLoading] = useState(false);

  const [expense, setExpense] = useState({
    name: "",
    categoryId: "",
    amount: "",
    date: "",
    icon: "",
  });

  const expenseCategoriesOptions = expenseCategoriesData || [];

  const handleInputChange = (name, value) => {
    setExpense({...expense, [name]: value });

    console.log(name, value);
  }

  const handleAddExpense = async (expense) => {
    if (loading) return;

    setLoading(true);

    if (!expense.name) {
      toast.error("Expense name is required.");
      setLoading(false);
      return;
    }

    if (!expense.categoryId) {
      toast.error("Expense category is required.");
      setLoading(false);
      return;
    }

    if (!expense.amount) {
      toast.error("Expense amount is required.");
      setLoading(false);
      return;
    }

    if (!expense.date) {
      toast.error("Expense date is required.");
      setLoading(false);
      return;
    }

    if (!expense.icon) {
      toast.error("Expense icon is required.");
      setLoading(false);
      return;
    }

    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isEditing && initialExpenseData) {
      setExpense({...initialExpenseData});
    } else {
      setExpense({
        name: "",
        categoryId: "",
        amount: "",
        date: "",
        icon: "",
      });
    }
  }, [initialExpenseData, isEditing]);

  return (
    <div className="card p-4">
      <Input
        type="text"
        label="Expense Source Name"
        value={expense.name}
        onchange={(e) => handleInputChange("name", e.target.value)}
        placeholder="e.g Transport, Food, Entertainment, etc."
        className="mb-4"
      />

      {
        expenseCategoriesOptions.length > 0 ? (
          <div className="mb-4">
            <Input
              isSelect="true"
              label="Expense Category"
              options={expenseCategoriesOptions.map((category) => ({
                label: category.name,
                value: category.id,
                icon: category.icon,
              }))}
              value={expense.categoryId}
              onchange={(target) => handleInputChange("categoryId", target.value)}
            />
          </div>
        ) : (
          <p className="text-gray-500 text-sm bg-gray-100 p-3 rounded">
            No categories found. Please create a category first.
          </p>
        )
      }

      <Input
        type="number"
        label="Amount"
        value={expense.amount}
        onchange={(e) => handleInputChange("amount", Math.max(1, Number(e.target.value)))}
        placeholder="e.g 500, 1000, 2500, etc."
        className="mb-4"
      />

      <Input
        type="date"
        label="Date"
        value={expense.date ? expense.date.split("T")[0] : new Date().toISOString().split("T")[0]}
        onchange={(e) => handleInputChange("date", e.target.value)}
        className="mb-4"
      />

      <EmojiPickerPopup
        width="300px"
        height="420px"
        emojiStyle="google"
        selectedEmoji={expense.icon}
        onEmojiChoose={(emojiData) => handleInputChange("icon", emojiData.emoji)}
      />

      <button
        type="button"
        className={"mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" + (expenseCategoriesOptions.length === 0 ? " cursor-not-allowed opacity-50" : "")}
        onClick={() => handleAddExpense(expense)}
        disabled={loading || expenseCategoriesOptions.length === 0}
      >
        {loading ? (
          <>
            <LoaderCircle size={16} className="animate-spin inline-block mr-2 mb-1" />

            {isEditing ? "Updating..." : "Adding..."}
          </>
        ) : (
          <>
            {isEditing ? "Update Expense" : "Add Expense"}
          </>
        )}
      </button>
    </div>
  );
}

export default AddExpenseForm;