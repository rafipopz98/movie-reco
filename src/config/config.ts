import { config } from "dotenv";

config({ path: ".env" });

export const PORT = <string>process.env.PORT;
export const REDIS_PORT = <string>process.env.REDIS_PORT;
export const DBURL = <string>process.env.DBURL;
export const SECRET_TOKEN = <string>process.env.SECRET_TOKEN;
export const DURATION = <string>process.env.DURATION;
export const COOKIE_TOKEN = <string>process.env.COOKIE_TOKEN;
