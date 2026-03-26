import {Pencil, Trash2, TrendingDown, TrendingUp, UtensilsCrossed} from "lucide-react";

const TransactionInfoCard = ({ title, icon, date, amount, categoryType, category, hideDeleteBtn, onEdit, onDelete }) => {

  const getCategoryTypeStyle = () => categoryType === "Expense" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800";

  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-all">

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 shrink-0">
        {icon ? (
          <span className="text-xl">{icon}</span>
        ) : (
          <UtensilsCrossed className="text-green-700" size={22} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">

        {/* Top Row */}
        <div className="flex items-start justify-between gap-3">

          {/* Title + Meta */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-900">
              {title}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{date}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="capitalize">{category}</span>
            </div>
          </div>

          {/* Amount */}
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold ${getCategoryTypeStyle()}`}>
            <span>
              {categoryType === "Income" ? "+" : "-"} {amount} AED
            </span>

            {categoryType === "Income" ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition cursor-pointer"
          >
            <Pencil size={16} />
            Edit
          </button>

          {hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionInfoCard;