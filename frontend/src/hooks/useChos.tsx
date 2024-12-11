import { useQuery } from "@tanstack/react-query";
import choService from "../services/choService";
import { cho } from "../entities/cho";

const useChos = (id:number|string) => {
  // const fetchTodos = () =>
  //   axios
  //     .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => res.data);
  return useQuery<cho, Error>({
    queryKey: ["chos",id],
    queryFn: ()=> choService.get(id), //ko ()
    staleTime: 10 * 1000, // sau bnhiu thời gian thì goi lai queryFn một lần
  });
};

export default useChos;
