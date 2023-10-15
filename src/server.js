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

    return res.end("User created");
  }

  res.end("Hello World");
});

server.listen(3333);
