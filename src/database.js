import fs from "node:fs/promises";

export class Database {
  #database = {};

  #persist() {
    fs.writeFile("./database.json", JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    return data;
  }
}
