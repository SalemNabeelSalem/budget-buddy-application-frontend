import {useState} from "react";

import TransactionInfoCard from "../global/TransactionInfoCard.jsx";

import moment from "moment";
import {Download, LoaderCircle, Mail} from "lucide-react";

const IncomeList = ({ incomes, onEditIncome, onDeleteIncome, onDownloadIncome, onEmailIncome }) => {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);

  const handleDownloadIncomeReport = async () => {
    if (downloadLoading) return;

    setDownloadLoading(true);

    try {
      await onDownloadIncome();
    } finally {
      setDownloadLoading(false);
    }
  }

  const handleEmailIncomeReport = async () => {
    if (emailLoading) return;

    setEmailLoading(true);

    try {
      await onEmailIncome();
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Incomes Source</h4>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          className={`flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 active:bg-green-700 transition ${downloadLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleDownloadIncomeReport}
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
          onClick={handleEmailIncomeReport}
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

      {incomes.length === 0 ? (
        <p className="text-lg text-gray-500">No incomes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {incomes.map((income) => (
            <TransactionInfoCard
              key={income.id}
              title={income.name.charAt(0).toUpperCase() + income.name.slice(1)}
              icon={income.icon}
              date={moment(income.date).format("Do MMMM YYYY")}
              amount={income.amount}
              categoryType="Income"
              category={income.categoryName}
              hideDeleteBtn
              onEdit={() => onEditIncome(income)}
              onDelete={() => onDeleteIncome(income.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default IncomeList;