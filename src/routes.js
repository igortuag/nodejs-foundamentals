import { Database } from "./database";

export const routes = [
  {
    method: "GET",
    path: "/users",
    handle: async (req, res) => {
      const users = await Database.select("users");

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
  }
];
