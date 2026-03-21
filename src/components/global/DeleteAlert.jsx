import {useState} from "react";
import {LoaderCircle} from "lucide-react";

const DeleteAlert = ({ message, deleteHandler, cancelHandler }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteHandler();
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="text-lg font-semibold text-gray-800">
        {message}
      </p>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          onClick={cancelHandler}
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={loading}
          className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleDelete}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="animate-spin text-center" size={20} /> Deleting...
            </div>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
}

export default DeleteAlert;