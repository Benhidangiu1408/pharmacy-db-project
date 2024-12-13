import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Employee,
  InsertEmployee,
  UpdateEmployeeJobType,
  UpdateEmployeePassword,
} from "../entities/Employee";
import {
  employeeClient,
  insertEmployeeClient,
  updateEmployeeJobTypeClient,
  updateEmployeePasswordClient,
} from "../services/employeeService";

import { useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_EMPLOYEES } from "../constants.ts";

// Hook for fetching all employees
export const useEmployees = () => {
  return useQuery<Employee[], Error>({
    queryKey: ["employees"],
    queryFn: () => employeeClient.getAll(),
    staleTime: 10 * 1000, // Cache for 10 seconds
  });
};

// Hook for fetching a single employee by ID
export const useEmployee = (id: number) => {
  return useQuery<Employee, Error>({
    queryKey: ["employee", id],
    queryFn: () => employeeClient.get(id), // Pass the ID to fetch a single employee
    enabled: !!id, // Ensure the query does not run if no ID is provided
  });
};

// Mutation Hook for adding an employee
export const useAddEmployee = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<
    Employee, // The type of data returned from the mutation
    Error, // The type of error that may be thrown
    InsertEmployee, // The type of variables passed to the mutation function
    { previousEmployees: Employee[] } // Context returned from `onMutate`
  >({
    // mutationFn: (newEmployee)=> insertEmployeeClient.create(newEmployee),
    mutationFn: async (newEmployee): Promise<Employee> => {
      const savedEmployee = await insertEmployeeClient.create(newEmployee);
      // Transform or ensure `savedEmployee` matches `Employee` type
      return {
        ...savedEmployee,
        id: 0, // Ensure the `id` field exists
      };
    },

    onMutate: async (newEmployee) => {

      const previousEmployees =
        queryClient.getQueryData<Employee[]>(CACHE_KEY_EMPLOYEES) || [];

      // Get the last `id` in the employee list (assume the list is sorted by `id` ascending)
      const lastId = previousEmployees.length
        ? Math.max(...previousEmployees.map((emp) => emp.id))
        : 0;

      // Optimistically assign a new `id` (lastId + 1)
      const optimisticEmployee = {
        id: lastId + 1,
        ...newEmployee,
      };

      // Optimistically update the employees cache
      queryClient.setQueryData<Employee[]>(
        CACHE_KEY_EMPLOYEES,
        (employees = []) => [optimisticEmployee, ...employees]
      );

      // Trigger onAdd callback
      onAdd();

      return { previousEmployees }; // Provide the snapshot to the context
    },

    onSuccess: (savedEmployee) => {
      // Replace the optimistic entry with the actual saved data
      queryClient.setQueryData<Employee[]>(CACHE_KEY_EMPLOYEES, (employees) =>
        employees?.map((employee) =>
          employee.id === savedEmployee.id ? savedEmployee : employee
        )
      );
    },

    onError: (error, newEmployee, context) => {
      // Roll back to the previous employees cache on error
      if (context?.previousEmployees) {
        queryClient.setQueryData(
          CACHE_KEY_EMPLOYEES,
          context.previousEmployees
        );
      }
    },
  });
};

export const useUpdateEmployeePassword = () => {
  return useMutation<
    void, // No response from the API
    Error, // The type of errors that may occur
    UpdateEmployeePassword // The type of variables to pass to the mutation
  >({
    mutationFn: async ({ id, new_password }) => {
      await updateEmployeePasswordClient.update(
        { id, new_password } // Send the required data
      );
    },
  });
};

export const useUpdateEmployeeJobType = () => {
  return useMutation<
    void, // No response from the API
    Error, // The type of errors that may occur
    UpdateEmployeeJobType // The type of variables to pass to the mutation
  >({
    mutationFn: async ({ id, new_job_type }) => {
      await updateEmployeeJobTypeClient.update(
        { id, new_job_type } // Send the required data
      );
    },
  });
};
