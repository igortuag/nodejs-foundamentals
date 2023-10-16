import http from "node:http";

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === "/users" && method === "GET") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  if (url === "/users" && method === "POST") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "john@doe.com"
    });

    return res.writeHead(201).end();
  }

  res.writeHead(404).end();
});

server.listen(3333);
