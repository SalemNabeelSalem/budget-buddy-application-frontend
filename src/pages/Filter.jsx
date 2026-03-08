import Dashboard from "../components/Dashboard.jsx";
import UseUser from "../hooks/UseUser.jsx";

const Filter = () => {
  UseUser();

  return (
    <Dashboard activeMenu="Filters">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Filter Page</h1>
        <p className="text-gray-600">This is the filter page. You can apply filters to your expenses here.</p>
      </div>
    </Dashboard>
  );
}

export default Filter;