import http from "node:http";

const user = []

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  console.log(`Request method: ${method} | Endpoint: ${url}`);

  if (url === "/users" && method === "GET") {
    return res.end("Hello users");
  }

  if (url === "/users" && method === "POST") {
    return res.end("User created");
  }

  res.end("Hello World");
});

server.listen(3333);
