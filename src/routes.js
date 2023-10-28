export const routes = [
  {
    method: "GET",
    path: "/users",
    handle: async (req, res) => {
      const users = await req.database.select("users");

      return res
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(users));
    }
  }
];
