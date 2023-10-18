// Netflix & Spotify

// Import client by CSV (Excel)
// 1gb = 1.000.000 rows
// POST /upload import.csv

// 10mb/s - 100s

// 100s -> to start doing something

// 10mb/s -> first second 10000 rows

// with stream its possible to start processing the data while its being uploaded

// process.stdin.pipe(process.stdout);

import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null);
    } else {
      const buf = Buffer.from(String(i));

      this.push(buf);
    }
  }
}

new OneToHundredStream().pipe(process.stdout);
