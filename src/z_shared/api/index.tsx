import axios, { AxiosRequestConfig } from "axios";
import * as https from "https";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export async function server<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  const res = await axios(process.env.PROFILE_SERVER_URL + url, {
    ...config,
    httpsAgent,
  });
  return res.data;
}
