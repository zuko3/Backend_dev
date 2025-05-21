import { ReasonPhrases } from "http-status-codes";

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

export { verifyApplicationUnit };
