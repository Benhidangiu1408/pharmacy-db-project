import { useMutation, useQuery } from "@tanstack/react-query";
import { adminOrderClient, employeeOrderClient, insertOrderClient, orderStatusClient } from "../services/orderService";
import { AdminOrder, EmployeeOrder, InsertOrder, OrderStatus } from "../entities/Order";


// Hook for fetching all employees
export const useAdminOrder = () => {
  return useQuery<AdminOrder[], Error>({
    queryKey: ["admin_orders"],
    queryFn: () => adminOrderClient.getAll(),
    staleTime: 10 * 1000, // Cache for 10 seconds
  });
};

export const useInsertOrder = () => {
    return useMutation<void, Error, InsertOrder>({
      mutationFn: async (newOrder) => {
        // Call the APIClient's create method to insert the order
        await insertOrderClient.create(newOrder);
      },
      onError: (error) => {
        console.error("Error inserting order:", error);
        // Optional: handle errors (e.g., show a toast notification)
      },
      onSuccess: () => {
        console.log("Order inserted successfully!");
        // Optional: trigger side effects on success (e.g., close modal, show success message)
      },
    });
  };

// Hook for fetching a single employee by ID
export const useEmployeeOrder = (id: number) => {
  return useQuery<EmployeeOrder[], Error>({
    queryKey: ["employee_orders", id],
    queryFn: () => employeeOrderClient.getAll(id), // Pass the ID to fetch a single employee
    enabled: !!id, // Ensure the query does not run if no ID is provided
  });
};

export const useOrderStatus = () => {
    return useQuery<OrderStatus[], Error>({
      queryKey: ["statuses"],
      queryFn: () => orderStatusClient.getAll(), // Pass the ID to fetch a single employee
    });
  };

