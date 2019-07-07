import got = require("got");

import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const API_KEY = "4afc5e1e71b1a9d4048c5caa0dcba938";
const BASE_URL = "https://api.darksky.net/forecast/";
const QUERY_STRING = "exclude=[minutely,hourly,daily,alerts,flags]&units=auto";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
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
