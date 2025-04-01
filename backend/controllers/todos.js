import Todos from "../models/todos.js";
import User from "../models/users.js"; 
export const getTodos = async (req, res) => {
  const userId = req.params.userId;
  try {
    const todos = await Todos.find({ userId: userId });

    res.status(200).json({ data: todos });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export const addTodo = async (req, res) => {
  const newTodo = req.body;

  if (newTodo.title.length === 0) {
    res.status(200).json({ err: "title cant be empty" });
    return;
  }

  try {
    const todo = await Todos.create(newTodo);
    res.status(200).json({ data: todo });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export const editTodo = async (req, res) => {
    const id = req.params.id;
    const { title, completed, userId } = req.body;
    
    console.log("Received editTodo request:", { id, title, completed, userId });
  
    try {
      const todo = await Todos.findById(id);
  
      if (!todo.completed && completed && !todo.alreadyCounted) {
        await User.findByIdAndUpdate(userId, { $inc: { completedTasks: 1 } });
        req.body.alreadyCounted = true;
      }
  
      const updatedTodo = await Todos.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedTodo) {
        console.error("Todo not found for update");
        return res.status(404).json({ err: "Todo not found" });
      }
  
      res.status(200).json({ data: updatedTodo });
    } catch (err) {
      console.error("Error in editTodo:", err);
      res.status(500).json({ err: err.message });
    }
  };
  
export const deleteTodo = async (req, res) => {
  let id = req.params.id;

  try {
    const todo = await Todos.findByIdAndDelete(id);
    res.status(200).json({ data: todo });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
