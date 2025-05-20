import jwt from "jsonwebtoken";
import { ReasonPhrases } from "http-status-codes";

async function verifyToken(request) {
  const token = request?.headers?.["x-auth-token"];
  if (!token) {
    throw new Error(ReasonPhrases.UNAUTHORIZED);
  }
  try {
    const userDetails = jwt.verify(token, process.env.JWT_SECRETE);
    request.user = {
      email: userDetails.email,
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function verifyApplicationUnit(request) {
  const x_com_name = request?.headers?.["x-com"];
  const ALLOWED_X_COM = process.env.ALLOWED_X_COM.split(",");
  if (!x_com_name) {
    throw new Error(`${ReasonPhrases.BAD_REQUEST} x-com required`);
  }
  if (!ALLOWED_X_COM.includes(x_com_name)) {
    throw new Error(`${ReasonPhrases.BAD_REQUEST} x-com`);
  }
}

export { verifyToken, verifyApplicationUnit };
