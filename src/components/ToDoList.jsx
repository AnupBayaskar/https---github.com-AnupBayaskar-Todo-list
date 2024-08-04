import React, { useState } from 'react';
import '../App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [newText, setNewText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  

  const addTodo = (text) => {
    setTodos([...todos, { id: nextId, text, completed: false }]);
    setNextId(nextId + 1);
    setNewText('');
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
    setEditId(null);
    setEditText('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newText.trim()) {
      addTodo(newText);
    }
  };

  const handleEdit = (todo) => {
    if (editId) {
      updateTodo(editId, editText);
    } else {
      setEditId(todo.id);
      setEditText(todo.text);
    }
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>
      {editId && (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => updateTodo(editId, editText)}>Save</button>
          <button onClick={() => setEditId(null)}>Cancel</button>
        </div>
      )}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {editId === todo.id ? (
              <span>{todo.text}</span>
            ) : (
              <span>{todo.text}</span>
            )}
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => handleEdit(todo)}>
              {editId === todo.id ? 'Save' : 'Edit'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
