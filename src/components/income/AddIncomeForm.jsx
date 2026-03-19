import {useEffect, useState} from "react";

import Input from "../global/Input.jsx";
import EmojiPickerPopup from "../global/EmojiPickerPopup.jsx";

import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";

const AddIncomeForm = ({ incomeCategoriesData, onAddIncome, initialIncomeData, isEditing }) => {
  const [loading, setLoading] = useState(false);

  const [income, setIncome] = useState({
    name: "",
    categoryId: "",
    amount: "",
    date: "",
    icon: "",
  });

  const incomeCategoriesOptions = incomeCategoriesData || [];

  const handleInputChange = (name, value) => {
    setIncome({...income, [name]: value });

    console.log(name, value);
  }

  const handleAddIncome = async (income) => {
    if (loading) return;

    setLoading(true);

    if (!income.name) {
      toast.error("Income name is required.");
      setLoading(false);
      return;
    }

    if (!income.categoryId) {
      toast.error("Income category is required.");
      setLoading(false);
      return;
    }

    if (!income.amount) {
      toast.error("Income amount is required.");
      setLoading(false);
      return;
    }

    if (!income.date) {
      toast.error("Income date is required.");
      setLoading(false);
      return;
    }

    if (!income.icon) {
      toast.error("Income icon is required.");
      setLoading(false);
      return;
    }

    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isEditing && initialIncomeData) {
      setIncome({...initialIncomeData});
    } else {
      setIncome({
        name: "",
        categoryId: "",
        amount: "",
        date: "",
        icon: "",
      });
    }
  }, [initialIncomeData, isEditing]);

  return (
    <div className="card p-4">
      <Input
        type="text"
        label="Income Source Name"
        value={income.name}
        onchange={(e) => handleInputChange("name", e.target.value)}
        placeholder="e.g Salary of June, Freelance project, etc."
        className="mb-4"
      />

      {
        incomeCategoriesOptions.length > 0 ? (
          <div className="mb-4">
            <Input
              isSelect="true"
              label="Income Category"
              options={incomeCategoriesOptions.map((category) => ({
                label: category.name,
                value: category.id,
                icon: category.icon,
              }))}
              value={income.categoryId}
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
        value={income.amount}
        onchange={(e) => handleInputChange("amount", Math.max(1, Number(e.target.value)))}
        placeholder="e.g 500, 1000, 2500, etc."
        className="mb-4"
      />

      <Input
        type="date"
        label="Date"
        value={income.date ? income.date.split("T")[0] : new Date().toISOString().split("T")[0]}
        onchange={(e) => handleInputChange("date", e.target.value)}
        className="mb-4"
      />

      <EmojiPickerPopup
        width="300px"
        height="420px"
        emojiStyle="google"
        selectedEmoji={income.icon}
        onEmojiChoose={(emojiData) => handleInputChange("icon", emojiData.emoji)}
      />

      <button
        type="button"
        className={"mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" + (incomeCategoriesOptions.length === 0 ? " cursor-not-allowed opacity-50" : "")}
        onClick={() => handleAddIncome(income)}
        disabled={loading || incomeCategoriesOptions.length === 0}
        >
        {loading ? (
          <>
            <LoaderCircle size={16} className="animate-spin inline-block mr-2 mb-1" />

            {isEditing ? "Updating..." : "Adding..."}
          </>
        ) : (
          <>
            {isEditing ? "Update Income" : "Add Income"}
          </>
        )}
      </button>
    </div>
  )
}

export default AddIncomeForm;