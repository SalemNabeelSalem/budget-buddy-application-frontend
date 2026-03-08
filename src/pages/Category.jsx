import Dashboard from "../components/Dashboard.jsx";
import UseUser from "../hooks/UseUser.jsx";

const Category = () => {
  UseUser();

  return (
    <Dashboard activeMenu="Categories">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Category Page</h1>
        <p className="text-gray-600">This is the category page. You can manage your expense categories here.</p>
      </div>
    </Dashboard>
  );
}

export default Category;