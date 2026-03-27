import {useEffect, useState} from "react";

import UseUser from "../hooks/UseUser.jsx";

import AxiosConfig from "../utils/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/api-endpoints.js";

import Dashboard from "../components/dashboard/Dashboard.jsx";

import toast from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, LineChart, Line, Legend } from "recharts";

const Home = () => {
  UseUser();

  const [loading, setLoading] = useState(false);

  const [dashboardData, setDashboardData] = useState({
    totalIncomes: 0,
    totalExpenses: 0,
    recent5Expenses: [],
    recent5Incomes: [],
    recentTransactions: [],
  });

  // ✅ Summary
  const summaryData = [
    { name: "Income", amount: dashboardData.totalIncomes },
    { name: "Expenses", amount: dashboardData.totalExpenses },
  ];

  // ✅ Expense Breakdown
  const expenseData = dashboardData?.recent5Expenses?.map((item) => ({
    name: item.categoryName,
    value: item.amount,
  })) || [];

  // ✅ Income Breakdown
  const incomeData = dashboardData?.recent5Incomes?.map((item) => ({
    name: item.categoryName,
    value: item.amount,
  })) || [];

  // ✅ Transactions Trend
  const transactionData = dashboardData?.recentTransactions?.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    income: item.type === "income" ? item.amount : 0,
    expense: item.type === "expense" ? item.amount : 0,
  })) || [];

  // ✅ Extra Stats
  const netSavings = dashboardData.totalIncomes - dashboardData.totalExpenses;
  const totalTransactions = dashboardData.recentTransactions ? dashboardData.recentTransactions.length : 0;

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.DASHBOARD.LIST);

      if (response.status === 200) {
        setDashboardData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData().then(() => {
      console.log("Dashboard data fetched successfully.");
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div className="home">
      <Dashboard activeMenu="Dashboard">
        <div className="p-6 space-y-6">
          {/* 🔥 HEADER */}
          <div>
            <h1 className="text-3xl font-bold">Financial Dashboard</h1>
            <p className="text-gray-500">
              Smart overview of your financial activity
            </p>
          </div>

          {/* 💰 TOP STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Income" value={dashboardData.totalIncomes} currency={"AED"} />
            <StatCard title="Expenses" value={dashboardData.totalExpenses} currency={"AED"} />
            <StatCard title="Savings" value={netSavings} currency={"AED"} />
            <StatCard title="Transactions" value={totalTransactions} />
          </div>

          {/* 📊 MAIN CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* 📊 BAR */}
            <div className="bg-white p-4 rounded-2xl shadow col-span-1">
              <h3 className="font-semibold mb-3">Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={summaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 🥧 EXPENSE PIE */}
            <div className="bg-white p-4 rounded-2xl shadow">
              <h3 className="font-semibold mb-3">Expenses</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 🟢 INCOME PIE */}
            <div className="bg-white p-4 rounded-2xl shadow">
              <h3 className="font-semibold mb-3">Income Sources</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={incomeData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 📈 TREND */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-3">Cash Flow Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" />
                <Line type="monotone" dataKey="expense" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

// 🔹 Reusable Stat Card
const StatCard = ({ title, value, currency }) => (
  <div className="bg-white shadow rounded-2xl p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-xl font-bold">{currency} {value}</h2>
  </div>
);

export default Home;