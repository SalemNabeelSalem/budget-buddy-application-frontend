import {useCallback, useEffect, useState} from "react";

import UseUser from "../hooks/UseUser.jsx";

import Model from "../components/Model.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";
import CategoryList from "../components/category/CategoryList.jsx";
import AddCategoryForm from "../components/category/AddCategoryForm.jsx";

import AxiosConfig from "../utils/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/api-endpoints.js";

import {Plus} from "lucide-react";
import toast from "react-hot-toast";

const Category = () => {
  UseUser();

  const [loading, setLoading] = useState(false);

  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);

  const [categoryDate, setCategoryDate] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.CATEGORY.LIST);

      if (response.status === 200) {
        setCategoryDate(response.data);
      }
    } catch (error) {
      console.error("error fetching category details:", error);

      toast.error("Failed to fetch category details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddCategory = async (category) => {
    if (loading) return;

    setLoading(true);

    const existingCategory = categoryDate.find(
      (cat) => cat.name.toLowerCase() === category.name.toLowerCase()
    );

    if (existingCategory) {
      toast.error("A category with the same name already exists. Please choose a different name.");
      setLoading(false);
      return;
    }

    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.CATEGORY.CREATE, category);

      if (response.status === 201) {
        toast.success("category added successfully.");

        setOpenAddCategoryModal(false);

        fetchCategoryDetails().then(
          () => console.log("category details fetched successfully after adding category.")
        );
      }
    } catch (error) {
      console.error("error adding category:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category);

    setOpenEditCategoryModal(true);
  }

  const handleUpdateCategory = async (updatedCategory) => {
    if (loading) return;

    setLoading(true);

    const existingCategory = categoryDate.find(
      (cat) => cat.name.toLowerCase() === updatedCategory.name.toLowerCase() && cat.id !== selectedCategory.id
    );

    if (existingCategory) {
      toast.error("A category with the same name already exists. Please choose a different name.");
      setLoading(false);
      return;
    }

    try {
      const response = await AxiosConfig.put(API_ENDPOINTS.CATEGORY.UPDATE(selectedCategory.id), updatedCategory);

      if (response.status === 200) {
        toast.success("category updated successfully.");

        setOpenEditCategoryModal(false);

        setSelectedCategory(null);

        fetchCategoryDetails().then(
          () => console.log("category details fetched successfully after updating category.")
        );
      }
    } catch (error) {
      console.error("error updating category:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteCategory = (category) => {
    console.log("handle delete category:", category);
  }

  useEffect(() => {
    fetchCategoryDetails().then(() => {
      console.log("category details fetched successfully.");
    }).catch((error) => {
      console.error("error fetching category details:", error);
    });

    console.log("selected category changed:", selectedCategory);
  }, [selectedCategory, fetchCategoryDetails]);

  return (
    <Dashboard activeMenu="Categories">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>

          <button
            className="flex items-center mt-1 gap-2 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 active:bg-blue-700 transition"
            onClick={() => setOpenAddCategoryModal(true)}
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>

        <CategoryList categories={categoryDate} onEditCategory={handleEditCategory} onDeleteCategory={handleDeleteCategory} />

        {openAddCategoryModal && (
          <Model
            title="Add Category"
            isOpen={openAddCategoryModal}
            onClose={() => setOpenAddCategoryModal(false)}
          >
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </Model>
        )}

        {openEditCategoryModal && (
          <Model
            title="Update Category"
            isOpen={openEditCategoryModal}
            onClose={() => {
              setOpenEditCategoryModal(false);
              setSelectedCategory(null);
            }}
          >
            <AddCategoryForm
              onAddCategory={handleUpdateCategory}
              initialCategoryData={{...selectedCategory}}
              isEditing={true}
            />
          </Model>
        )}
      </div>
    </Dashboard>
  );
}

export default Category;