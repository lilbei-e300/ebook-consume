"use client";
import { useState, useEffect } from "react";

interface ProductFiltersProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
}

export default function ProductFilters({ 
  sortBy, 
  onSortChange, 
  priceRange, 
  onPriceRangeChange 
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? 0 : parseInt(value);
    const newRange = { ...localPriceRange, [type]: numValue };
    setLocalPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    onPriceRangeChange(localPriceRange);
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bộ lọc</h2>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sắp xếp theo</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="name-asc">Tên A-Z</option>
          <option value="name-desc">Tên Z-A</option>
        </select>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Khoảng giá</h3>
        <div className="flex space-x-2 mb-2">
          <div className="flex-1">
            <label htmlFor="min-price" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Từ
            </label>
            <input
              type="number"
              id="min-price"
              value={localPriceRange.min === 0 ? '' : localPriceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="max-price" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Đến
            </label>
            <input
              type="number"
              id="max-price"
              value={localPriceRange.max === 1000000 ? '' : localPriceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              placeholder="1,000,000"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
        <button
          onClick={applyPriceFilter}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
} 