"use client";

interface ProductCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", name: "Tất cả sản phẩm" },
  { id: "vegetables", name: "Rau củ quả" },
  { id: "fruits", name: "Trái cây" },
  { id: "grains", name: "Ngũ cốc" },
  { id: "dairy", name: "Sản phẩm từ sữa" },
  { id: "meat", name: "Thịt" },
  { id: "seafood", name: "Hải sản" },
  { id: "processed", name: "Thực phẩm chế biến" },
];

export default function ProductCategories({ selectedCategory, onCategoryChange }: ProductCategoriesProps) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Danh mục sản phẩm</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
              selectedCategory === category.id
                ? "bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
} 