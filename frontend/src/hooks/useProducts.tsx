import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService"; // Assuming you have a productService
import { Product } from "../entities/product"; // Import the Product interface

const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["data"], // Key to identify this query in the cache
    queryFn: productService.getAll, // Function to fetch the product list
    staleTime: 10 * 60 * 1000, // 10 minutes (adjust as needed)
  });
};

export default useProducts;