import { Customer } from "../entities/Customer"
import APIClient from "./api-client"

export default new APIClient<Customer>("/api/v1/getCustomerDetails")
