// Netflix & Spotify

// Import client by CSV (Excel)
// 1gb = 1.000.000 rows
// POST /upload import.csv

// 10mb/s - 100s

// 100s -> to start doing something

// 10mb/s -> first second 10000 rows

// with stream its possible to start processing the data while its being uploaded

// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

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

    console.log(number * 10);
    callback();
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = parseInt(chunk.toString()) * -1;

    callback(null, Buffer.from(transformed.toString()));
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
