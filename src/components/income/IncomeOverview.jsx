import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const IncomeOverview = ({ transactions }) => {

  const calculateTotalIncome = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0).toFixed(2);
  }

  const calculateAverageIncome = () => {
    return transactions.length > 0 ? (transactions.reduce((total, transaction) => total + transaction.amount, 0) / transactions.length).toFixed(2) : "0.00";
  }

  const calculateHighestIncome = () => {
    return transactions.length > 0 ? Math.max(...transactions.map(transaction => transaction.amount)).toFixed(2) : "0.00";
  }

  const calculateLowestIncome = () => {
    return transactions.length > 0 ? Math.min(...transactions.map(transaction => transaction.amount)).toFixed(2) : "0.00";
  }

  return (
    <div className="income-overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-4">
          <h4 className="text-lg font-semibold mb-2">Total Incomes</h4>
          <p className="text-2xl font-bold text-green-500">
            {transactions.length}
          </p>
        </div>

        <div className="card p-4">
          <h4 className="text-lg font-semibold mb-2">Total Incomes Amount</h4>
          <p className="text-2xl font-bold text-green-500">
            AED {calculateTotalIncome()}
          </p>
        </div>

        <div className="card p-4">
          <h4 className="text-lg font-semibold mb-2">Average Incomes</h4>
          <p className="text-2xl font-bold text-green-500">
            AED {calculateAverageIncome()}
          </p>
        </div>

        <div className="card p-4">
          <h4 className="text-lg font-semibold mb-2">Highest Income</h4>
          <p className="text-2xl font-bold text-green-500">
            AED {calculateHighestIncome()}
          </p>
        </div>

        <div className="card p-4">
          <h4 className="text-lg font-semibold mb-2">Lowest Income</h4>
          <p className="text-2xl font-bold text-green-500">
            AED {calculateLowestIncome()}
          </p>
        </div>
      </div>

      <div className="card p-6 mt-8 shadow-md rounded-lg bg-white">
        <h3 className="text-xl font-semibold mb-4">Incomes Trend</h3>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={transactions} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              fill="url(#incomeGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default IncomeOverview;