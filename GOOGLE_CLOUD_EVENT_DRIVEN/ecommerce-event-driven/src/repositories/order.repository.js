const pool = require("../infra/db");

async function createOrder(order) {
  const query = `
    INSERT INTO orders (id, user_id, status, total_amount)
    VALUES ($1, $2, $3, $4)
  `;

  await pool.query(query, [
    order.id,
    order.userId,
    order.status,
    order.totalAmount,
  ]);
}

module.exports = {
  createOrder,
};
