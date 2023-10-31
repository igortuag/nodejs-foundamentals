// /user/:id
export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-Z]*)/g;

  const pathWithParams = path.replaceAll(routeParamsRegex, '([a-zA-Z0-9\-\_]+)');

  return path.replace(routeParamsRegex, (_, paramName) => {
    return `(?<${paramName}>[a-zA-Z0-9-]*)`;
  });
}
