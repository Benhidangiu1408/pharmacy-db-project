import { useQuery } from "@tanstack/react-query";

import { Customer } from "../entities/Customer";
import customerService from "../services/customerService";
import { Shipper } from "../entities/Shipper";
import shipperService from "../services/shipperService";
import { Voucher } from "../entities/Voucher";
import voucherService from "../services/voucherService";

const useVouchers = () => {
  // const fetchTodos = () =>
  //   axios
  //     .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => res.data);
  return useQuery<Voucher[], Error>({
    queryKey: ["vouchers"],
    queryFn: () => voucherService.getAll(), //ko ()
    staleTime: 10 * 1000, // sau bnhiu thời gian thì goi lai queryFn một lần
  });
};

export default useVouchers;
