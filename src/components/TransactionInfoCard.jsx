import {Pencil, Trash2, TrendingDown, TrendingUp, UtensilsCrossed} from "lucide-react";

const TransactionInfoCard = ({ title, icon, date, amount, categoryType, category, hideDeleteBtn, onDelete }) => {
  const getCategoryTypeStyle = () => categoryType === "Expense" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800";

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <span className="text-2xl">
            {icon}
          </span>
        ) : (
          <UtensilsCrossed className="text-green-800" size={24} />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-gray-800 capitalize">
            {title}
          </p>

          <p className="text-xs text-gray-500 capitalize">
            {date}
          </p>

          <p className="text-xs text-gray-500 capitalize">
            {category}
          </p>
        </div>

        <div className={`px-2 py-1 rounded text-sm font-medium ${getCategoryTypeStyle()}`}>
          {categoryType === "Income" ? "+" : "-"}

          {amount} AED

          {categoryType === "Income" ? (
            <TrendingUp size={16} className="inline-block ml-2 text-green-500" />
          ) : (
            <TrendingDown size={16} className="inline-block ml-2 text-red-500" />
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
            onClick={() => {}}
          >
            <Pencil size={18} />
             Edit
          </button>

          {hideDeleteBtn && (
            <button
              className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm cursor-pointer"
              onClick={onDelete}
            >
              <Trash2 size={18} />
              Delete
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default TransactionInfoCard;