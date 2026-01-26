// todosLib.js

let todosArray = [];
let nextId = 1;

// Add a todo
function addOne(task, completed, dueDate) {
  if (!task || completed === undefined || !dueDate) {
    return false;
  }

  const newTodo = {
    id: nextId++,
    task,
    completed,
    dueDate
  };

  todosArray.push(newTodo);
  return newTodo;
}

// Get all todos
function getAll() {
  return todosArray;
}

// Find todo by ID
function findById(id) {
  const numericId = Number(id);
  const todo = todosArray.find(item => item.id === numericId);
  return todo || false;
}

// Update todo by ID
function updateOneById(id, updatedData) {
  const todo = findById(id);
  if (todo) {
    if (updatedData.task !== undefined) todo.task = updatedData.task;
    if (updatedData.completed !== undefined) todo.completed = updatedData.completed;
    if (updatedData.dueDate !== undefined) todo.dueDate = updatedData.dueDate;
    return todo;
  }
  return false;
}

// Delete todo by ID
function deleteOneById(id) {
  const todo = findById(id);
  if (todo) {
    const initialLength = todosArray.length;
    todosArray = todosArray.filter(item => item.id !== Number(id));
    return todosArray.length < initialLength;
  }
  return false;
}

// Test the module
if (require.main === module) {
  console.log(addOne("Buy groceries", false, "2025-08-30"));
  console.log(addOne("Finish homework", true, "2025-09-01"));

  console.log("getAll called:", getAll());
  console.log("findById called:", findById(1));

  console.log(
    "updateOneById called:",
    updateOneById(1, { completed: true })
  );

  console.log("deleteOneById called:", deleteOneById(2));
  console.log("getAll after delete:", getAll());
}

// Export
const ToDos = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById
};

module.exports = ToDos;
