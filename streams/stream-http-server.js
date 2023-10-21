import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = parseInt(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(transformed.toString()));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const buffer = Buffer.concat(buffers).toString()


  return res.end(buffer)
  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res);
});

server.listen(3334);
