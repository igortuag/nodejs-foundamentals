import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  console.log(`Request method: ${method} | Endpoint: ${url}`);

  res.end("Hello World");
});

server.listen(3333);
