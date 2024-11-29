import todoAxiosInstance from "./axiosInstance";

export const fetchTodos = async () => {
  const { data } = await todoAxiosInstance.get("http://localhost:3000/todos");
  return data;
};

export const addTodo = async (newTodo) => {
  const { data } = await todoAxiosInstance.post("http://localhost:3000/todos", {
    title: newTodo,
    completed: false,
  });
  return data;
};

export const deleteTodo = async (id) => {
  await todoAxiosInstance.delete(`http://localhost:3000/todos/${id}`);
};

export const toggleComplete = async (id, completed) => {
  const { data } = await todoAxiosInstance.patch(
    `http://localhost:3000/todos/${id}`,
    {
      completed: !completed,
    }
  );
	return data;
};
