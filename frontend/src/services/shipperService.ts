import { Shipper } from "../entities/Shipper"
import APIClient from "./api-client"

export default new APIClient<Shipper>("/api/v1/showShipperInfo")
