import { Router } from "express";
import pool from "./db";

const router = Router();

// Get all Acts
router.get("/acts", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM ACTS");
  res.json(rows);
});

// Add new player
router.post("/players", async (req, res) => {
  const { name } = req.body;
  const [result] = await pool.query("INSERT INTO players (name) VALUES (?)", [name]);
  res.json({ player_id: (result as any).insertId, name });
});

export default router;
