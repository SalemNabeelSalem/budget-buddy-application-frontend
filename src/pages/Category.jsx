import {useEffect, useState} from "react";

import UseUser from "../hooks/UseUser.jsx";

import Model from "../components/Model.jsx";
import Dashboard from "../components/Dashboard/Dashboard.jsx";
import CategoryList from "../components/Category/CategoryList.jsx";
import AddCategoryForm from "../components/Category/AddCategoryForm.jsx";

import AxiosConfig from "../utils/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/api-endpoints.js";

import {Plus} from "lucide-react";
import toast from "react-hot-toast";

const Category = () => {
  UseUser();

  const [loading, setLoading] = useState(false);

  const [categoryDate, setCategoryDate] = useState([]);

  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
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
  };

  const handleAddCategory = async (category) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.CATEGORY.CREATE, category);

      if (response.status === 201) {
        toast.success("Category added successfully.");

        setOpenAddCategoryModal(false);

        fetchCategoryDetails().then(
          () => console.log("category details fetched successfully after adding category.")
        );
      }
    } catch (error) {
      console.error("error adding category:", error.response.data.message);

      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategoryDetails().then(() => {
      console.log("category details fetched successfully.");
    });
  }, []);

  return (
    <Dashboard activeMenu="Categories">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>

          <button
            className="add-btn flex items-center gap-1"
            onClick={() => setOpenAddCategoryModal(true)}
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>

        <CategoryList categories={categoryDate} />

        {openAddCategoryModal && (
          <Model
            title="Add Category"
            isOpen={openAddCategoryModal}
            onClose={() => setOpenAddCategoryModal(false)}
          >
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </Model>
        )}
      </div>
    </Dashboard>
  );
}

export default Category;