"use client";

interface ProductCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export default function ProductCategories({ 
  selectedCategory, 
  onCategoryChange,
  categories 
}: ProductCategoriesProps) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Danh mục</h2>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange("all")}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
            selectedCategory === "all"
              ? "bg-brand-500 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          Tất cả
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
              selectedCategory === category
                ? "bg-brand-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
} 