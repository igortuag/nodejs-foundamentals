// /user/:id
export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-Z]*)/g;

  return path.replace(routeParamsRegex, (_, paramName) => {
    return `(?<${paramName}>[a-zA-Z0-9-]*)`;
  });
}
