import UseUser from "../hooks/UseUser.jsx";

import Dashboard from "../components/Dashboard/Dashboard.jsx";

const Expense = () => {
  UseUser();

  return (
    <Dashboard activeMenu="Expenses">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Expense Page</h1>
        <p className="text-gray-600">This is the expense page. You can manage your expenses here.</p>
      </div>
    </Dashboard>
  );
}

export default Expense;