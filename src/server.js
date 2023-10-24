import http from "node:http";
import { json } from "./middlewares/json";

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (url === "/users" && method === "GET") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  json(req, res);

  if (url === "/users" && method === "POST") {
    const { name, email } = req.body;

    users.push({
      id: users.length + 1,
      name,
      email
    });

    return res.writeHead(201).end();
  }

  res.writeHead(404).end();
});

server.listen(3333);
