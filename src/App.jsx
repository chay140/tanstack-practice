import { useState } from "react";
import useFetchTodos from "./hooks/useFetchTodos";
import useAddTodo from "./hooks/useAddTodo";
import useDeleteTodo from "./hooks/useDeleteTodo";
import useToggleTodo from "./hooks/useToggleTodo";

function TodoList() {
  const [newTodo, setNewTodo] = useState("");

  // useQuery
  // 7 단계 : 가져오기
  const { todos, isPending, isError } = useFetchTodos();

  // useMutation
  // 5 + 6단계 : 추가, 삭제, 토글
  // 8 단계 hook으로 나누기
  const { mutate: addMutation } = useAddTodo();
  const { mutate: deleteMutation } = useDeleteTodo();
  const { mutate: toggleMutation } = useToggleTodo();

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    addMutation(newTodo);
  };

  const handleDeleteTodo = async (id) => {
    deleteMutation(id);
  };

  const handleToggleComplete = async (id, completed) => {
    toggleMutation({ id, completed });
  };

  if (isPending) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Todo List</h1>
        <p>로딩 중...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Todo List</h1>
        <p>에러 발생!!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>
          Add Todo
        </button>
      </div>
      <div style={styles.cardContainer}>
        {todos?.map((todo) => (
          <div key={todo.id} style={styles.card}>
            <div style={styles.cardContent}>
              <p
                style={{
                  ...styles.cardTitle,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "green" : "black",
                }}
              >
                {todo.title}
              </p>
              <div style={styles.buttonGroup}>
                <button
                  onClick={() => handleToggleComplete(todo.id, todo.completed)}
                  style={styles.completeButton}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    margin: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "200px",
    fontSize: "16px",
    color: "black",
  },
  addButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    maxWidth: "800px",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "auto",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: "18px",
    margin: 0,
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  completeButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};

export default TodoList;
