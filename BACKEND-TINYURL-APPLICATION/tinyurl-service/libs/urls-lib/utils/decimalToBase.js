function decimalToBase62(num) {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (num === 0) return characters[0]; // Special case for zero

  let base62 = "";

  while (num > 0) {
    const remainder = num % 62; // Get the remainder
    base62 = characters[remainder] + base62; // Add corresponding character
    num = Math.floor(num / 62); // Reduce the number
  }

  return base62;
}

export { decimalToBase62 };
