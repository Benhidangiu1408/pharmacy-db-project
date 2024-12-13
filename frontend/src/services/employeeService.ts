import { Employee, InsertEmployee, UpdateEmployeeJobType, UpdateEmployeePassword } from "../entities/Employee";
import APIClient from "./api-client"; // Import your API client

// Declare each APIClient instance for your entities

export const insertEmployeeClient = new APIClient<InsertEmployee>("/api/v1/insertEmployee");
export const updateEmployeePasswordClient = new APIClient<UpdateEmployeePassword>("/api/v1/updateEmployeePassword");
export const updateEmployeeJobTypeClient = new APIClient<UpdateEmployeeJobType>("/api/v1/updateEmployeeJobType");
export const employeeClient = new APIClient<Employee>("/api/v1/showAllEmployees");

