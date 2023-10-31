// /user/:id
export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-Z]*)/g;

  const pathWithParams = path.replaceAll(routeParamsRegex, "(?<id>[a-zA-Z0-9-_]+)");

  const pathRegex = new RegExp(`^${pathWithParams}$`);

  return pathRegex;
}
