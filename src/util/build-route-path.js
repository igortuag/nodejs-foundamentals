// /user/:id
export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-Z]*)/g;

  const pathWithParams = path.replaceAll(routeParamsRegex, '([a-zA-Z0-9\-\_]+)');

  const pathRegex = new RegExp(`^${pathWithParams}$`);

  return path.replace(routeParamsRegex, (_, paramName) => {
    return `(?<${paramName}>[a-zA-Z0-9-]*)`;
  });
}
