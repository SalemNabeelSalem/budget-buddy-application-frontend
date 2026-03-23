import {useState} from "react";

import TransactionInfoCard from "../TransactionInfoCard.jsx";

import moment from "moment";
import {Download, LoaderCircle, Mail} from "lucide-react";

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense, onDownloadExpense, onEmailExpense }) => {

  const [downloadLoading, setDownloadLoading] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);

  const handleDownloadExpenseReport = async () => {
    if (downloadLoading) return;

    setDownloadLoading(true);

    try {
      await onDownloadExpense();
    } finally {
      setDownloadLoading(false);
    }
  }

  const handleEmailExpenseReport = async () => {
    if (emailLoading) return;

    setEmailLoading(true);

    try {
      await onEmailExpense();
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Expenses Source</h4>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          className={`flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 active:bg-green-700 transition ${downloadLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleDownloadExpenseReport}
          disabled={downloadLoading}
        >
          {downloadLoading ? (
            <>
              <LoaderCircle size={15} className="shrink-0 animate-spin" />
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <Download size={15} className="shrink-0" />
              <span>Download Report</span>
            </>
          )}
        </button>

        <button
          className={`flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 active:bg-blue-700 transition ${emailLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleEmailExpenseReport}
          disabled={emailLoading}
        >
          {emailLoading ? (
            <>
              <LoaderCircle size={15} className="shrink-0 animate-spin" />
              <span>Emailing...</span>
            </>
          ) : (
            <>
              <Mail size={15} className="shrink-0" />
              <span>Email Report</span>
            </>
          )}
        </button>
      </div>

      {expenses.length === 0 ? (
        <p className="text-lg text-gray-500">No expenses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {expenses.map((expense) => (
            <TransactionInfoCard
              key={expense.id}
              title={expense.name.charAt(0).toUpperCase() + expense.name.slice(1)}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMMM YYYY")}
              amount={expense.amount}
              categoryType="Expense"
              category={expense.categoryName}
              hideDeleteBtn
              onEdit={() => onEditExpense(expense)}
              onDelete={() => onDeleteExpense(expense.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;