import { createClient } from "redis";

const lookup = createClient({
  url: process.env.REDIS_URL,
});

export async function redisLookUp(key) {
  if (!lookup.isOpen) {
    await lookup.connect();
  }
  const lookupValue = await lookup.get(key);
  return lookupValue;
}

export async function redisLookUpSet(key, value) {
  if (!lookup.isOpen) {
    await lookup.connect();
  }
  await lookup.set(key, value);
}
