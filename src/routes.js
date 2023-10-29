import { randomUUID } from "node:crypto";

import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handle: async (req, res) => {
      const users = await database.select("users");

      return res
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(users));
    }
  },
  {
    method: "POST",
    path: "/users",
    handle: async (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email
      };

      await Database.insert("users", user);

      return res.writeHead(201).end();
    }
  },
  {
    method: "DELETE",
    path: "/users/:id",
    handle: async (req, res) => {
      const { id } = req.params;

      await database.delete("users", id);

      return res.writeHead(204).end();
    }
  }
];
