import {useState} from "react";

import UseUser from "../hooks/UseUser.jsx";

import AxiosConfig from "../utils/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/api-endpoints.js";

import Dashboard from "../components/dashboard/Dashboard.jsx";

import {Search} from "lucide-react";
import toast from "react-hot-toast";

const Filter = () => {
  UseUser();

  const input =
    "w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition";

  const [type, setType] = useState("income");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [sortField, setSortField] = useState("date");

  const [sortOrder, setSortOrder] = useState("asc");

  const [keyword, setKeyword] = useState("");

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      setLoading(false);
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date.");
      setLoading(false);
      return;
    }

    try {
      const search = {
        type: type,
        name: keyword,
        sortBy: sortField,
        startDate: startDate,
        endDate: endDate,
        direction: sortOrder,
      }

      const response = await AxiosConfig.post(API_ENDPOINTS.FILTERS.LIST, search);

      if (response.status === 200) {
        setTransactions(response.data);
      } else {
        toast.error("Failed to fetch transactions. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("An error occurred while fetching transactions. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dashboard activeMenu="Filters">
      <div className="max-w-8xl mx-auto my-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">

          <div className="mb-5">
            <h5 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Select Filters
            </h5>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-5">

            {/* Type */}
            <div className="flex flex-col gap-1 md:col-span-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Type</label>
              <select
                value={type}
                className={input}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="flex flex-col gap-1 md:col-span-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Start Date</label>
              <input
                type="date"
                value={startDate}
                className={input}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-1 md:col-span-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">End Date</label>
              <input
                type="date"
                value={endDate}
                className={input}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Sort Field */}
            <div className="flex flex-col gap-1 md:col-span-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Sort By</label>
              <select
                value={sortField}
                className={input}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex flex-col gap-1 md:col-span-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Sort</label>
              <select
                value={sortOrder}
                className={input}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Search */}
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Search</label>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={keyword}
                  placeholder="Search transactions..."
                  className={`${input} pr-10`}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <button
                  type="submit"
                  onClick={handleSearch}
                  className="flex items-center justify-center px-4 h-10.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <Search size={18} />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Transactions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border rounded-2xl bg-gray-50">
                <div className="text-5xl mb-4">📭</div>

                <h3 className="text-lg font-semibold mb-2">No transactions found</h3>

                <p className="text-gray-500 text-sm">
                  Start by adding your first transaction.
                </p>
              </div>
            ) : (
              transactions.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 border"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{item.icon}</span>

                    <span className="text-sm text-gray-500 capitalize">
                    {item.categoryName}
                  </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 leading-snug capitalize">
                    {item.name}
                  </h3>

                  {/* Date */}
                  <p className="text-sm text-gray-400 mb-4">
                    {new Date(item.date).toLocaleDateString()}
                  </p>

                  {/* Amount */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Amount</span>

                    <span className={`text-lg font-semibold ${item.categoryType === "income" ? "text-green-600" : "text-red-600"}`}>
                    AED {item.amount.toFixed(2)}
                  </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default Filter;