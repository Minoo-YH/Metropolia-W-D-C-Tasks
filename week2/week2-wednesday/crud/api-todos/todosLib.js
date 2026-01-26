let todosArray = [];
let nextId = 1;

// Add one todo
function addOne(task, completed, dueDate) {
  if (!task || completed === undefined || !dueDate) {
    return false;
  }

  const newTodo = {
    id: nextId++,
    task,
    completed,
    dueDate,
  };

  todosArray.push(newTodo);
  return newTodo;
}

// Get all todos
function getAll() {
  return todosArray;
}

// Find by ID
function findById(id) {
  const numericId = Number(id);
  const todo = todosArray.find(item => item.id === numericId);
  return todo || false;
}

// Update by ID
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

// Delete by ID
function deleteOneById(id) {
  const todo = findById(id);
  if (todo) {
    todosArray = todosArray.filter(item => item.id !== Number(id));
    return true;
  }
  return false;
}

// Test block
if (require.main === module) {
  console.log(addOne("Buy groceries", false, "2025-08-30"));
  console.log(addOne("Finish homework", true, "2025-09-01"));
  console.log("getAll:", getAll());
  console.log("findById:", findById(1));
  console.log("update:", updateOneById(1, { completed: true }));
  console.log("delete:", deleteOneById(2));
  console.log("after delete:", getAll());
}

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

