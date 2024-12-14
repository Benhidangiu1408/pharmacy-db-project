// import { useQuery } from "@tanstack/react-query";
// import batchService from "../services/batchService"; // Assuming you have a batchService
// import { batch } from "../entities/batch"; // Import the batch interface

// const usebatchs = () => {
//   return useQuery<batch[], Error>({
//     queryKey: ["data"], // Key to identify this query in the cache
//     queryFn: () => batchService.getAll(), // Function to fetch the batch list
//     staleTime: 10 * 60 * 1000, // 10 minutes (adjust as needed)
//   });
// };

// export default usebatchs;