import http from "node:http";

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const body = JSON.parse(Buffer.concat(buffers).toString());

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
