import Dashboard from "../components/Dashboard.jsx";
import UseUser from "../hooks/UseUser.jsx";

const Income = () => {
  UseUser();

  return (
    <Dashboard activeMenu="Incomes">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Income Page</h1>
        <p className="text-gray-600">This is the income page. You can manage your income sources here.</p>
      </div>
    </Dashboard>
  );
}

export default Income;