import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

// Query Parameters: URL Stateful => Filters, pagination, search
// Route Params: Identify resources (GET, PUT, DELETE)
// Request Body:

// GET http://localhost:3333/users?search=Tuag
// GET http://localhost:3333/users/1

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(
    (route) => route.method === method && route.path === url
  );

  if (route) {
    return route.handle(req, res);
  }

  res.writeHead(404).end();
});

server.listen(3333);
