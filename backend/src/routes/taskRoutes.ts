import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";

const router = Router();
const taskRepo = AppDataSource.getRepository(Task);

// Get all tasks
router.get("/", async (_req, res) => {
  const tasks = await taskRepo.find();
  res.json(tasks);
});

// Create new task
router.post("/", async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = taskRepo.create({ title, description, status, dueDate });
  await taskRepo.save(task);
  res.status(201).json(task);
});

// Update task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let task = await taskRepo.findOneBy({ id });
  if (!task) return res.status(404).json({ error: "Task not found" });

  Object.assign(task, req.body);
  await taskRepo.save(task);
  res.json(task);
});

// Delete task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await taskRepo.delete(id);
  res.status(204).send();
});

export default router;
