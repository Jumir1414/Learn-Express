import { Request, Response } from "express";
import pool from "../database/db";
import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "YOURFATHERSHEAD";
const SALT_ROUNDS = 10;

const authController = {
  register: async (req: Request, res: Response) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ error: "All fields(name,email,password) are required!!" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const result = await pool.query(
        "INSERT INTO users(username,password,email) VALUES($1, $2, $3) RETURNING *",
        [userName, hashedPassword, email]
      );

      const user: Users = result.rows[0];
      const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  login: async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "All fields(name,password) are required!!" });
    }
    try {
      const result = await pool.query(
        "SELECT * from users WHERE username = $1",
        [userName]
      );
      if (result.rows.length === 1) {
        const user: Users = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
            expiresIn: "1h",
          });
          res.json({ token });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      } else {
        res.status(401).json({ message: "Username Not Found!!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default authController;
