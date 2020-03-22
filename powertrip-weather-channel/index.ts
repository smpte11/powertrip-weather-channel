import got from "got";

import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const API_KEY = process.env.DARKSKY_API_KEY;
const BASE_URL = "https://api.darksky.net/forecast/";
const QUERY_STRING = "exclude=[minutely,hourly,daily,alerts,flags]&units=auto";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { lat, long } = req.query;

  if (!lat || !long) {
    context.res = {
      status: 400
    };
  }

  try {
    const url = `${BASE_URL}${API_KEY}/${lat},${long}?${QUERY_STRING}`;
    const { body } = await got(url);
    context.res = { body };
  } catch (error) {
    context.res = {
      status: 400,
      body: error.message
    };
  }
};

export default httpTrigger;
