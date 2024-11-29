import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleComplete } from "../api/api";

const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }) => toggleComplete(id, completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export default useToggleTodo;
