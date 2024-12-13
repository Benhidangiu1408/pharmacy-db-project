import { Product } from "../entities/product"
import APIClient from "./api-client"

export default new APIClient<Product>("/api/v1/products")
