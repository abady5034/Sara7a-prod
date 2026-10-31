import { client } from "../../main.js";

export const set = async ({ key, value, ttl = undefined }) => {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  client.set(key, value, { EX: ttl });
};

export const get = async ({ key }) => {
  let data = await client.get(key);
  let result;
  try {
    result = JSON.parse(data);
  } catch {
    result = data;
  }
  return result;
};

export const del = async ({ key }) => {
  return await client.del(key);
};

export const exists = async ({ key }) => {
  return await client.exists(key);
};

export const ttl = async ({ key }) => {
  let data = await client.ttl(key);
  return data;
};

export const incr = async ({ key }) => {
  let data = await client.incr(key);
  return data;
};

export const prefix = async ({ prefix }) => {
  let data = await client.keys(`${prefix}*`);
  return data;
};

export const getUserKey = (userId) => `user::${userId.toString()}`;
export const getUserOTPKey = (userId) => `OTP::${getUserKey(userId)}`;
export const getUserTriesKey = (userId) => `Bloked::${getUserKey(userId)}`;
export const getUserResetKey = (userId) => `Reset Password::${getUserKey(userId)}`;