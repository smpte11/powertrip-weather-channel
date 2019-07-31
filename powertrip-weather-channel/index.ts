import got = require("got");

import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const API_KEY = "4afc5e1e71b1a9d4048c5caa0dcba938";
const BASE_URL = "https://api.darksky.net/forecast/";
const QUERY_STRING = "exclude=[minutely,hourly,daily,alerts,flags]&units=auto";

const icons = {
  rain: "rain",
  snow: "rain",
  sleet: "cloudy",
  wind: "cloudy",
  fog: "cloudy",
  cloudy: "cloudy",
  "clear-day": "sunny",
  "clear-night": "moon",
  "partly-cloudy-day": "sunny",
  "partly-cloudy-night": "sunny"
};

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
    const parsed = JSON.parse(body);
    parsed.currently.icon = icons[parsed.currently.icon];
    context.res = { body: JSON.stringify(parsed) };
  } catch (error) {
    context.res = {
      status: 400,
      body: error.message
    };
  }
};

export default httpTrigger;
