// /user/:id
export function buildRoutePath(path) {
  const segments = path.split("/");

  const params = segments
    .filter((segment) => segment.startsWith(":"))
    .map((segment) => segment.replace(":", ""));

  const regex = segments
    .filter((segment) => !segment.startsWith(":"))
    .map((segment) => segment.replace("/", "\\/"))
    .join("\\/");

  return {
    regex: new RegExp(`^${regex}$`),
    params
  };
}
