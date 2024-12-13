import { useQuery } from "@tanstack/react-query";

import { Customer } from "../entities/Customer";
import customerService from "../services/customerService";

const useCustomers = () => {
  // const fetchTodos = () =>
  //   axios
  //     .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => res.data);
  return useQuery<Customer[], Error>({
    queryKey: ["customers"],
    queryFn: ()=> customerService.getAll(), //ko ()
    staleTime: 10 * 1000, // sau bnhiu thời gian thì goi lai queryFn một lần
  });
};

export default useCustomers;
