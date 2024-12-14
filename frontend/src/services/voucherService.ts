import { Shipper } from "../entities/Shipper"
import { Voucher } from "../entities/Voucher"
import APIClient from "./api-client"

export default new APIClient<Voucher>("/api/v1/showVoucherInfo")
