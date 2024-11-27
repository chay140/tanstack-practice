import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3000/todos");
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const { data } = await axios.post("http://localhost:3000/todos", {
      title: newTodo,
      completed: false,
    });
    setTodos((prev) => [...prev, data]);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = async (id, completed) => {
    const { data } = await axios.patch(`http://localhost:3000/todos/${id}`, {
      completed: !completed,
    });
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: data.completed } : todo,
      ),
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
        <button onClick={addTodo} style={styles.addButton}>
          Add Todo
        </button>
      </div>
      <div style={styles.cardContainer}>
        {todos.map((todo) => (
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
                  onClick={() => toggleComplete(todo.id, todo.completed)}
                  style={styles.completeButton}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
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
