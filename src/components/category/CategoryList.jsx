import {Layers2, Pencil, Trash} from "lucide-react";

const CategoryList = ({categories, onEditCategory, onDeleteCategory}) => {

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Categories Source</h4>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60"
            >
              <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {category.icon ? (
                  <span className="text-2xl">
                    {/*
                    <img
                      src={category.icon}
                      alt={`${category.name} icon`}
                      className="w-5 h-5 object-contain"
                    />
                    */}
                    {category.icon}
                  </span>
                ): (
                  <Layers2 className="text-purple-800" size={24} />
                )}
              </div>

              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-medium capitalize">{category.name}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{category.type}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
                    onClick={() => onEditCategory(category)}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                    onClick={() => onDeleteCategory(category)}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;