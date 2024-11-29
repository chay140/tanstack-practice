import { fetchTodos } from "../api/api";
import { useQuery } from "@tanstack/react-query";

const useFetchTodos = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return {
    todos: data,
    isPending,
    isError,
  };
};

export default useFetchTodos;
