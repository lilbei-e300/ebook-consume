"use client";
import { useState, useEffect, useCallback } from "react";
import ProductHero from "@/components/products/ProductHero";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import ProductCategories from "@/components/products/ProductCategories";
import ProductPagination from "@/components/products/ProductPagination";
import { productService, ProductSearchParams, ProductSearchResponse } from "@/services/productService";
import { toast } from "react-hot-toast";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchResponse, setSearchResponse] = useState<ProductSearchResponse | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const params: ProductSearchParams = {
        page: currentPage - 1,
        size: 12,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        sortBy: sortBy === "newest" ? "createdAt" : 
               sortBy === "price-asc" ? "price" : 
               sortBy === "price-desc" ? "price" : 
               sortBy === "name-asc" ? "name" : 
               sortBy === "name-desc" ? "name" : "createdAt",
        sortDirection: sortBy === "price-asc" || sortBy === "name-asc" ? "asc" : "desc"
      };

      const response = await productService.searchProducts(params);
      setSearchResponse(response);
    } catch (err) {
      console.error('Error fetching products:', err);
      toast.error('Có lỗi xảy ra khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, sortBy, priceRange]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    setPriceRange(range);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <ProductHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <ProductCategories 
                selectedCategory={selectedCategory} 
                onCategoryChange={handleCategoryChange}
                categories={searchResponse?.suggestedCategories || []}
              />
              <ProductFilters 
                sortBy={sortBy}
                onSortChange={handleSortChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
              />
            </div>
            <div className="lg:w-3/4">
              <ProductGrid 
                products={searchResponse?.products || []}
                loading={loading}
              />
              {searchResponse && (
                <ProductPagination 
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  totalItems={searchResponse.totalProducts}
                  itemsPerPage={searchResponse.pageSize}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 