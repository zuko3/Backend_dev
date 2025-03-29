import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import { decimalToBase62 } from "../utils/decimalToBase.js";

export default async function (request, reply) {
  let client = null;
  try {
    const { long_url, expiry_date = "2030-01-17T12:17:00Z" } = request.body;

    //Generate hexadecimal string
    const md5Hash = crypto.createHash("md5").update(long_url).digest("hex");

    //Pick first 6 chars
    const hexString = md5Hash.substring(0, 6);

    // Convert hexadecimal to decimal
    const decimalRep = parseInt(hexString, 16);

    //convert decimal to base 62
    const base62ShortUrl = decimalToBase62(decimalRep);

    const createdAt = new Date().toISOString();

    client = await request.fastify.pg.connect();
    await client.query(
      "INSERT into tableurls (short_url, long_url, expiry_date,created_at) VALUES($1,$2,$3,$4) RETURNING short_url, long_url, expiry_date,created_at",
      [base62ShortUrl, long_url, expiry_date, createdAt]
    );

    reply.status(StatusCodes.CREATED).send({
      short_url: base62ShortUrl,
      long_url: long_url,
      expiry_date: expiry_date,
      created_at: createdAt,
    });
  } catch (err) {
    throw err;
  } finally {
    client?.release();
  }
}
