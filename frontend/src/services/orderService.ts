import { AdminOrder, EmployeeOrder, InsertOrder, OrderStatus } from "../entities/Order";
import APIClient from "./api-client"; // Import your API client

// Declare each APIClient instance for your entities

export const insertOrderClient = new APIClient<InsertOrder>("/api/v1/insertOrder");
export const adminOrderClient = new APIClient<AdminOrder>("/api/v1/getAllOrders");
export const employeeOrderClient = new APIClient<EmployeeOrder>("/api/v1/getEmployeeOrders");
export const orderStatusClient = new APIClient<OrderStatus>("/api/v1/showOrderStatus");
