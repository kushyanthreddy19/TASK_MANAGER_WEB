import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { AppDataSource } from './data-source';
import { Task, TaskStatus } from './entity/Task';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    
    // Routes
    app.get('/tasks', async (req, res) => {
      try {
        const tasks = await AppDataSource.getRepository(Task).find();
        res.json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
      }
    });

    app.get('/tasks/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const task = await AppDataSource.getRepository(Task).findOneBy({ id });
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
      } catch (error) {
        res.status(500).json({ message: "Error fetching task" });
      }
    });

    app.post('/tasks', async (req, res) => {
      try {
        const { title, description, status, dueDate } = req.body;
        
        if (!title || !status) {
          return res.status(400).json({ message: "Title and status are required" });
        }

        if (!Object.values(TaskStatus).includes(status)) {
          return res.status(400).json({ message: "Invalid status value" });
        }

        const taskRepository = AppDataSource.getRepository(Task);
        const newTask = taskRepository.create({
          title,
          description,
          status,
          dueDate: dueDate ? new Date(dueDate) : null
        });

        const savedTask = await taskRepository.save(newTask);
        res.status(201).json(savedTask);
      } catch (error) {
        res.status(500).json({ message: "Error creating task" });
      }
    });

    app.put('/tasks/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { title, description, status, dueDate } = req.body;
        
        const taskRepository = AppDataSource.getRepository(Task);
        const task = await taskRepository.findOneBy({ id });

        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }

        if (status && !Object.values(TaskStatus).includes(status)) {
          return res.status(400).json({ message: "Invalid status value" });
        }

        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.status = status ?? task.status;
        task.dueDate = dueDate ? new Date(dueDate) : task.dueDate;

        const updatedTask = await taskRepository.save(task);
        res.json(updatedTask);
      } catch (error) {
        res.status(500).json({ message: "Error updating task" });
      }
    });

    app.delete('/tasks/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const result = await AppDataSource.getRepository(Task).delete(id);
        
        if (result.affected === 0) {
          return res.status(404).json({ message: "Task not found" });
        }
        
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });