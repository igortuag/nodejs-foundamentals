// Netflix & Spotify

// Import client by CSV (Excel)
// 1gb = 1.000.000 rows
// POST /upload import.csv

// 10mb/s - 100s

// 100s -> to start doing something

// 10mb/s -> first second 10000 rows

// with stream its possible to start processing the data while its being uploaded

// process.stdin.pipe(process.stdout);

import { Readable, Writable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        this.push(`${i}\n`);
      }
    }, 1000);
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = parseInt(chunk.toString());

    setTimeout(() => {
      this.emit("result", number * 10);
      callback();
    }, 1000);
  }
}

new OneToHundredStream().pipe(process.stdout);
