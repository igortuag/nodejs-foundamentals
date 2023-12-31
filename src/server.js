import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import extractQueryParams from "./util/extract-query-params.js";

// Query Parameters: URL Stateful => Filters, pagination, search
// Route Params: Identify resources (GET, PUT, DELETE)
// Request Body: Create or edit resources (POST, PUT) => send sensitive data

// GET http://localhost:3333/users?search=Tuag
// GET http://localhost:3333/users/1

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handle(req, res);
  }

  res.writeHead(404).end();
});

server.listen(3333);
