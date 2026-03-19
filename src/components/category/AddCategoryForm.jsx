import {useEffect, useState} from "react";

import Input from "../global/Input.jsx";

import EmojiPickerPopup from "../global/EmojiPickerPopup.jsx";

import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";

const AddCategoryForm = ({onAddCategory, initialCategoryData, isEditing}) => {
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    type: "",
    icon: "",
  });

  const categoryTypes = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleInputChange = (name, value) => {
    setCategory({...category, [name]: value });

    console.log(name, value);
  }

  const handleAddCategory = async (category) => {
    if (loading) return;

    setLoading(true);

    if (!category.name) {
      toast.error("category name is required.");
      return;
    }

    if (!category.type) {
      toast.error("category type is required.");
      return;
    }

    if (!category.icon) {
      toast.error("category icon is required.");
      return;
    }

    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory({...initialCategoryData});
    } else {
      setCategory({
        name: "",
        type: "expense",
        icon: "",
      });
    }
  }, [isEditing, initialCategoryData])

  return (
    <div className="card p-4">
      <Input
        type="text"
        label="Category Name"
        value={category.name}
        onchange={(e) => handleInputChange("name", e.target.value)}
        placeholder="eg., Salary, Groceries, Freelance, etc."
      />

      <Input
        type="select"
        label="Category Type"
        value={category.type}
        onchange={(target) => handleInputChange("type", target.value)}
        isSelect={true}
        options={categoryTypes}
      />

      <EmojiPickerPopup
        width="300px"
        height="420px"
        emojiStyle="google"
        selectedEmoji={category.icon}
        onEmojiChoose={(emojiData) => handleInputChange("icon", emojiData.emoji)}
      />

      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => handleAddCategory(category)}
        disabled={loading}
      >
        {loading ? (
          <>
            <LoaderCircle size={16} className="animate-spin inline-block mr-2 mb-1" />

            {isEditing ? "Updating..." : "Adding..."}
          </>
        ) : (
          <>
            {isEditing ? "Update Category" : "Add Category"}
          </>
        )}
      </button>
    </div>
  );
};

export default AddCategoryForm;