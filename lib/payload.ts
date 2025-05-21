import { getPayload } from "payload";
import configPromise from "@payload-config";

export const initPayload = async () => {
  const payload = await getPayload({ config: configPromise });
  return payload;
};
