import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../api/api";

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export default useDeleteTodo;
