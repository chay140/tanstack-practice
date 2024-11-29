import useAddTodo from "./useAddTodo";
import useDeleteTodo from "./useDeleteTodo";
import useFetchTodos from "./useFetchTodos";
import useToggleTodo from "./useToggleTodo";

// 9 단계
const useTodos = () => {
  const { todos, isPending, isError } = useFetchTodos();
  const { mutate: addMutation } = useAddTodo();
  const { mutate: deleteMutation } = useDeleteTodo();
  const { mutate: toggleMutation } = useToggleTodo();

  return {
    todos,
    isPending,
    isError,
    addMutation,
    deleteMutation,
    toggleMutation,
  };
};

export default useTodos;
