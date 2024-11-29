import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../api/api";

const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export default useAddTodo;
