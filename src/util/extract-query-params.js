// ?search=term&sort=recent

export default function extractQueryParams(queryString) {
  return queryString
    .substr(1)
    .split("&")
    .reduce((acc, pair) => {
      const [key, value] = pair.split("=");

      return {
        ...acc,
        [key]: value
      };
    }, {});
}
