import { randomUUID } from "node:crypto";

import { Database } from "./database.js";
import { buildRoutePath } from "./util/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handle: async (req, res) => {
      const { search } = req.query;

      const users = await database.select(
        "users",
        search
          ? {
              name: search,
              email: search
            }
          : null
      );

      return res
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(users));
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
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
    path: buildRoutePath("/users/:id"),
    handle: async (req, res) => {
      const { id } = req.params;

      await database.delete("users", id);

      return res.writeHead(204).end();
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handle: async (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = {
        id,
        name,
        email
      };

      await database.update("users", id, user);

      return res.writeHead(204).end();
    }
  }
];
